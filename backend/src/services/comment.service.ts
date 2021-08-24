import { getCustomRepository } from 'typeorm';
import { Server } from 'socket.io';
import { ICommentReaction } from '../common/interfaces/comment-reaction';
import { IRequestWithUser } from '../common/interfaces/http/request-with-user.interface';
import {
  IComment,
  ICommentRequest,
  ICommentResponse,
} from '../common/interfaces/comment';
import {
  CommentRepository,
  NotificationRepository,
  CommentReactionRepository,
} from '../data/repositories';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { EntityType } from '../common/enums/entity-type';
import { SocketEvents } from '../common/enums/socket';
import { NotificationType } from '../common/enums/notification-type';
import { isNotify } from '../common/helpers/isNotify.helper';
import { HttpError } from '../common/errors/http-error';
import { mapChildToParent } from '../common/mappers/comment/map-child-to-parent';
import { sendMail } from '../common/utils/mailer.util';
import { env } from '../env';
import { MAX_NOTIFICATION_TITLE_LENGTH } from '../common/constants/notification';

export const getComments = async (
  pageId: string,
): Promise<ICommentResponse[]> => {
  const comments = await getCustomRepository(CommentRepository).findByPageId(
    pageId,
  );
  return mapChildToParent(
    comments.map((comment) => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
    })),
  );
};

export const notifyUsers = async (
  comment: IComment,
  io: Server,
): Promise<void> => {
  const { app } = env;
  const url = app.url;

  const commentRepository = getCustomRepository(CommentRepository);
  const notificationRepository = getCustomRepository(NotificationRepository);

  const { page } = await commentRepository.findPageByCommentId(comment.id);
  const { followingUsers } = page;
  const title = `A new comment from ${comment.author.fullName}`;
  const body = comment.text.slice(0, MAX_NOTIFICATION_TITLE_LENGTH);

  if (comment.parentCommentId) {
    const { author } = await commentRepository.findOneById(
      comment.parentCommentId,
    );

    const isNotifyComment = await isNotify(author.id, NotificationType.COMMENT);
    const isNotifyCommentEmail = await isNotify(
      author.id,
      NotificationType.COMMENT_EMAIL,
    );

    if (author.id !== comment.author.id) {
      if (isNotifyComment) {
        io.to(author.id).emit(SocketEvents.NOTIFICATION_NEW);

        await notificationRepository.createAndSave(
          title,
          body,
          EntityType.COMMENT,
          comment.id,
          author.id,
          false,
        );
      }

      if (isNotifyCommentEmail) {
        await sendMail({
          to: author.email,
          subject: 'A new response to your comment',
          text: `
        Hello,

        You received a response from ${comment.author.fullName} to your comment:

        "${comment.text}"

        ${url}`,
        });
      }
    }
  } else {
    for (const followingUser of followingUsers) {
      if (followingUser.id !== comment.author.id) {
        const { id, email } = followingUser;

        const isNotifyComment = await isNotify(id, NotificationType.COMMENT);
        const isNotifyCommentEmail = await isNotify(
          id,
          NotificationType.COMMENT_EMAIL,
        );

        if (isNotifyComment) {
          io.to(id).emit(SocketEvents.NOTIFICATION_NEW);

          await notificationRepository.createAndSave(
            title,
            body,
            EntityType.COMMENT,
            comment.id,
            id,
            false,
          );
        }

        if (isNotifyCommentEmail) {
          await sendMail({
            to: email,
            subject: 'A new comment to the page you are following',
            text: `
          Hello,

          A page you are following received a new comment from ${comment.author.fullName}:

          "${comment.text}"

          ${url}`,
          });
        }
      }
    }
  }
};

export const addComment = async (
  userId: string,
  pageId: string,
  { text, parentCommentId }: ICommentRequest,
  io: Server,
): Promise<IComment> => {
  const commentRepository = getCustomRepository(CommentRepository);

  if (parentCommentId) {
    const isParentCommentIdGenuine = await commentRepository.findOne({
      where: { id: parentCommentId },
    });

    if (!isParentCommentIdGenuine) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_SUCH_PARENT_COMMENT,
      });
    }
  }

  const { id } = await commentRepository.save({
    authorId: userId,
    pageId,
    text,
    parentCommentId,
  });

  const comment = await commentRepository.findOneById(id);

  const response = {
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  };

  io.to(pageId).emit(SocketEvents.PAGE_NEW_COMMENT, response);
  notifyUsers(response, io);

  return response;
};

export const deleteComment = async (
  id: string,
  pageId: string,
  userId: string,
  io: Server,
): Promise<void> => {
  getCustomRepository(CommentRepository).deleteById(id);
  io.to(pageId).emit(SocketEvents.PAGE_DELETE_COMMENT, { id, sender: userId });
};

export const handleCommentReaction = async (
  commentId: string,
  req: IRequestWithUser,
): Promise<ICommentReaction[]> => {
  const { userId, body } = req;
  const { reaction } = body;

  const commentReactionRepository = getCustomRepository(
    CommentReactionRepository,
  );
  const foundReaction = await commentReactionRepository.findOne({
    where: { commentId, userId, reaction },
  });

  if (foundReaction) {
    await commentReactionRepository.remove(foundReaction);
  } else {
    await commentReactionRepository.save({ commentId, userId, reaction });
  }

  const commentRepository = getCustomRepository(CommentRepository);
  const comment = await commentRepository.findOneById(commentId);
  const { reactions } = comment;

  return reactions;
};

export const getAllCommentReactions = async (
  commentId: string,
): Promise<ICommentReaction[]> => {
  const commentReactionRepository = getCustomRepository(
    CommentReactionRepository,
  );
  const reactions = await commentReactionRepository.find({ commentId });

  return reactions;
};
