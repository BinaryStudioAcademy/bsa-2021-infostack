import { getCustomRepository } from 'typeorm';
import { Server } from 'socket.io';
import {
  IComment,
  ICommentRequest,
  ICommentResponse,
} from '../common/interfaces/comment';
import {
  CommentRepository,
  NotificationRepository,
} from '../data/repositories';
import { ICommentReaction } from '../common/interfaces/comment-reaction';
import { IRequestWithUser } from '../common/interfaces/http/request-with-user.interface';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { HttpError } from '../common/errors/http-error';
import CommentReactionRepository from '../data/repositories/comment-reaction.repository';
import { mapChildToParent } from '../common/mappers/comment/map-child-to-parent';
import { sendMail } from '../common/utils/mailer.util';
import { env } from '../env';
import { MAX_NOTIFICATION_TITLE_LENGTH } from '../common/constants/notification';
import { EntityType } from '../common/enums/entity-type';
import { SocketEvents } from '../common/enums/socket';
import { uploadFile } from '../common/helpers/s3-file-storage.helper';
import { unlinkFile } from '../common/helpers/multer.helper';
import { transcriptAudio } from '../common/helpers/google-speach.helper';

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
  const { page } = await commentRepository.findPageByCommentId(comment.id);
  const { followingUsers } = page;
  const notificationRepository = getCustomRepository(NotificationRepository);
  const title = `A new comment from ${comment.author.fullName}`;
  const body = comment.text.slice(0, MAX_NOTIFICATION_TITLE_LENGTH);

  if (comment.parentCommentId) {
    const { author } = await commentRepository.findById(
      comment.parentCommentId,
    );
    if (author.id !== comment.author.id) {
      io.to(author.id).emit(SocketEvents.NOTIFICATION_NEW);
      await notificationRepository.createAndSave(
        title,
        body,
        EntityType.COMMENT,
        comment.id,
        author.id,
        false,
      );

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
  } else {
    for (const followingUser of followingUsers) {
      if (followingUser.id !== comment.author.id) {
        const { id, email } = followingUser;
        io.to(id).emit(SocketEvents.NOTIFICATION_NEW);
        await notificationRepository.createAndSave(
          title,
          body,
          EntityType.COMMENT,
          comment.id,
          id,
          false,
        );

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

  const comment = await commentRepository.findById(id);

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
  await getCustomRepository(CommentRepository).deleteById(id);
  const notificationRepository = getCustomRepository(NotificationRepository);
  const notifications = await notificationRepository.findAllByEntityTypeId(id);
  for (const notification of notifications) {
    await notificationRepository.deleteById(notification.id);
    io.to(notification.userId).emit(SocketEvents.NOTIFICATION_DELETE);
  }
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
  const comment = await commentRepository.findById(commentId);
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

export const uploadAudioComment = async (
  file: Express.Multer.File,
): Promise<any> => {
  const uploadedFile = await uploadFile(file);
  unlinkFile(file.path);
  const { Location } = uploadedFile;
  console.log(Location);
  const comment = await transcriptAudio(Location);

  return { location: Location, comment };
};
