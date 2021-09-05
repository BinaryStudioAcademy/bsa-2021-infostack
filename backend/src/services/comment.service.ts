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
  UserRepository,
} from '../data/repositories';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { NotificationType } from '../common/enums/notification-type';
import { isNotify, isNotifyMany } from '../common/helpers/is-notify.helper';
import { HttpError } from '../common/errors/http-error';
import { mapChildToParent } from '../common/mappers/comment/map-child-to-parent';
import { sendMail } from '../common/utils/mailer.util';
import { env } from '../env';
import { EntityType } from '../common/enums/entity-type';
import { SocketEvents } from '../common/enums/socket';
import { uploadFile } from '../common/helpers/s3-file-storage.helper';
import { unlinkFile } from '../common/helpers/multer.helper';
import { transcriptAudio } from '../common/helpers/google-speach.helper';
import PageRepository from '../data/repositories/page.repository';
import {
  commentNotification,
  commentMail,
  replyMail,
  mentionNotification,
  parseMentions,
  mentionMail,
} from '../common/utils';
import elasticCommentRepository from '../elasticsearch/repositories/comments.repository';

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
  mentionIds: string[],
  workspaceId: string,
  io: Server,
): Promise<void> => {
  const { pageId, parentCommentId, author } = comment;
  const { fullName, id: authorId } = author;
  const { url } = env.app;
  let { text } = comment;

  if (mentionIds) {
    text = parseMentions(text);
  }

  const followingUsers = await getCustomRepository(
    PageRepository,
  ).findFollowers(pageId);
  const notificationRepository = getCustomRepository(NotificationRepository);

  if (mentionIds.length) {
    const { title, body } = mentionNotification(fullName, text);
    const mentions = mentionIds.filter((mention) => mention !== authorId);

    const isNotifyCommentIds = await isNotifyMany(
      mentions,
      NotificationType.COMMENT,
    );
    const commentNotifications = mentions.filter(
      (mention) => !isNotifyCommentIds.includes(mention),
    );

    const notifications = commentNotifications.map((mention) => ({
      title,
      body,
      type: EntityType.COMMENT,
      entityTypeId: comment.id,
      userId: mention,
      workspaceId,
      read: false,
    }));
    await notificationRepository.createAndSaveMultiple(notifications);

    io.to(mentions).emit(SocketEvents.NOTIFICATION_NEW);

    const isNotifyEmailIds = await isNotifyMany(
      mentions,
      NotificationType.COMMENT_EMAIL,
    );

    const users = await getCustomRepository(UserRepository).findUsersByIds(
      mentions,
    );

    const emailNotifications = users.filter(
      ({ id }) => !isNotifyEmailIds.includes(id),
    );

    const mentionEmails = emailNotifications.map(({ email }) => email);
    const { subject, text: emailText } = mentionMail(fullName, text, url);
    await sendMail({
      bcc: mentionEmails,
      subject,
      text: emailText,
    });
  }

  const { title, body } = commentNotification(fullName, text);

  if (comment.parentCommentId) {
    const parentAuthor = await getCustomRepository(
      CommentRepository,
    ).findAuthor(parentCommentId);

    if (
      parentAuthor.id === comment.author.id ||
      mentionIds.includes(parentAuthor.id)
    ) {
      return;
    }

    const isNotifyComment = await isNotify(
      parentAuthor.id,
      NotificationType.COMMENT,
    );
    const isNotifyEmail = await isNotify(
      parentAuthor.id,
      NotificationType.COMMENT_EMAIL,
    );

    if (isNotifyComment) {
      io.to(parentAuthor.id).emit(SocketEvents.NOTIFICATION_NEW);
      await notificationRepository.createAndSave(
        title,
        body,
        EntityType.COMMENT,
        comment.id,
        parentAuthor.id,
        workspaceId,
        false,
      );
    }

    if (isNotifyEmail) {
      const { subject, text: emailText } = replyMail(
        parentAuthor.fullName,
        text,
        url,
      );
      await sendMail({
        to: parentAuthor.email,
        subject,
        text: emailText,
      });
    }

    return;
  }

  const followers = followingUsers.filter(
    ({ id }) => id !== authorId && !mentionIds.includes(id),
  );

  if (!followers || !followers.length) {
    return;
  }

  const followerIds = followers.map((follower) => follower.id);

  const isNotifyCommentIds = await isNotifyMany(
    followerIds,
    NotificationType.COMMENT,
  );

  const commentNotifications = followers.filter(
    ({ id }) => !isNotifyCommentIds.includes(id),
  );
  const commentNotificationIds = commentNotifications.map(({ id }) => id);

  const notifications = commentNotifications.map((follower) => ({
    title,
    body,
    type: EntityType.COMMENT,
    entityTypeId: comment.id,
    userId: follower.id,
    workspaceId,
    read: false,
  }));
  await notificationRepository.createAndSaveMultiple(notifications);

  io.to(commentNotificationIds).emit(SocketEvents.NOTIFICATION_NEW);

  const isNotifyEmailIds = await isNotifyMany(
    followerIds,
    NotificationType.COMMENT_EMAIL,
  );
  const emailNotifications = followers.filter(
    ({ id }) => !isNotifyEmailIds.includes(id),
  );

  const followerEmails = emailNotifications.map((follower) => follower.email);
  const { subject, text: emailText } = commentMail(fullName, text, url);
  await sendMail({
    bcc: followerEmails,
    subject,
    text: emailText,
  });
};

export const addComment = async (
  userId: string,
  pageId: string,
  workspaceId: string,
  { text, mentionIds, parentCommentId, voiceRecord }: ICommentRequest,
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
    voiceRecord,
  });

  await elasticCommentRepository.upsert({
    id,
    text,
    pageId,
    workspaceId,
  });

  const comment = await commentRepository.findById(id);

  const response = {
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  };

  io.to(pageId).emit(SocketEvents.PAGE_NEW_COMMENT, response);
  notifyUsers(response, mentionIds, workspaceId, io);

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
  await elasticCommentRepository.deleteById(id);
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
): Promise<{ url: string }> => {
  const uploadedFile = await uploadFile(file);
  const { Location } = uploadedFile;
  unlinkFile(file.path);

  return { url: Location };
};

export const transcriptAudioComment = async (
  file: Express.Multer.File,
): Promise<{ comment: string }> => {
  const comment = await transcriptAudio(file);
  unlinkFile(file.path);

  return { comment };
};
