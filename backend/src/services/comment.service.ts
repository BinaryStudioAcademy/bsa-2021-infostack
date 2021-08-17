import { getCustomRepository } from 'typeorm';
import { Server } from 'socket.io';
import { ICommentRequest, IComment } from '../common/interfaces/comment';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { HttpError } from '../common/errors/http-error';
import CommentRepository from '../data/repositories/comment.repository';
import NotificationRepository from '../data/repositories/notification.repository';
import { mapChildToParent } from '../common/mappers/comment/map-child-to-parent';
import { sendMail } from '../common/utils/mailer.util';
import { env } from '../env';
import { MAX_NOTIFICATION_TITLE_LENGTH } from '../common/constants/notification';
import { EntityType } from '../common/enums/entity-type';

export const getComments = async (pageId: string): Promise<IComment[]> => {
  const comments = await getCustomRepository(CommentRepository).findByPageId(
    pageId,
  );
  return mapChildToParent(comments);
};

export const notifyUsers = async (comment: IComment): Promise<void> => {
  const { app } = env;
  const url = app.url;

  const commentRepository = getCustomRepository(CommentRepository);
  const { page } = await commentRepository.findPageByCommentId(comment.id);
  const { followingUsers } = page;
  const notificationRepository = getCustomRepository(NotificationRepository);
  const title = `A new comment from ${comment.author.fullName}`;
  const body = comment.text.slice(0, MAX_NOTIFICATION_TITLE_LENGTH);

  if (comment.parentCommentId) {
    const { author } = await commentRepository.findOneById(
      comment.parentCommentId,
    );
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
  } else {
    for (const followingUser of followingUsers) {
      const { id, email } = followingUser;
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

  io.to(pageId).emit('page/newComment', comment);

  notifyUsers(comment);

  return comment;
};
