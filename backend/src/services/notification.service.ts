import { getCustomRepository } from 'typeorm';
import { EntityType } from '../common/enums/entity-type';
import { INotification } from '../common/interfaces/notification';
import {
  CommentRepository,
  NotificationRepository,
} from '../data/repositories';
import PageRepository from '../data/repositories/page.repository';
import { mapNotificationToINotification } from '../common/mappers/notification/map-notification-to-inotification';
import { Notification } from '../data/entities/notification';

const setSubtitleToComment = async (
  notification: Notification,
): Promise<INotification> => {
  const commentRepository = getCustomRepository(CommentRepository);
  const pageRepository = getCustomRepository(PageRepository);
  const comment = await commentRepository.findById(notification.entityTypeId);
  const page = await pageRepository.findByIdWithLastContent(comment.pageId);
  return {
    ...mapNotificationToINotification(notification),
    subtitle: page.pageContents[0].title,
    subtitleId: page.id,
  };
};

const setSubtitleToPage = async (
  notification: Notification,
): Promise<INotification> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithLastContent(
    notification.entityTypeId,
  );
  return {
    ...mapNotificationToINotification(notification),
    subtitle: page.pageContents[0].title,
    subtitleId: page.id,
  };
};

export const getNotifications = async (
  userId: string,
  workspaceId: string,
  limit?: number,
  from?: number,
): Promise<INotification[]> => {
  const notificationRepository = getCustomRepository(NotificationRepository);
  const start = from || 0;
  const notifications =
    await notificationRepository.findSomeByUserIdAndWorkspaceId(
      userId,
      workspaceId,
      start,
      limit,
    );

  const commentNotifications = notifications.filter(
    (notification) => notification.type === EntityType.COMMENT,
  );
  const pageNotifications = notifications.filter(
    (notification) => notification.type === EntityType.PAGE,
  );
  if (!commentNotifications.length && !pageNotifications.length) {
    return notifications.map(mapNotificationToINotification);
  } else {
    const expandedNotifications = notifications
      .filter(
        (notification) =>
          notification.type !== EntityType.COMMENT &&
          notification.type !== EntityType.PAGE,
      )
      .map(mapNotificationToINotification);
    for (const notification of commentNotifications) {
      try {
        const expandedNotification = await setSubtitleToComment(notification);
        expandedNotifications.push(expandedNotification);
      } catch {
        notificationRepository.delete(notification);
      }
    }
    for (const notification of pageNotifications) {
      try {
        const expandedNotification = await setSubtitleToPage(notification);
        expandedNotifications.push(expandedNotification);
      } catch {
        notificationRepository.delete(notification);
      }
    }
    return expandedNotifications;
  }
};

export const getNotificationsCount = async (
  userId: string,
  workspaceId: string,
): Promise<{ count: number }> => {
  const notificationRepository = getCustomRepository(NotificationRepository);
  const notifications =
    await notificationRepository.findAllByUserIdAndWorkspaceId(
      userId,
      workspaceId,
    );
  const count = notifications.filter(
    (notification) => !notification.read,
  ).length;
  return { count };
};

export const updateRead = async (
  notificationId: string,
  body: { read: boolean },
): Promise<INotification> => {
  const notificationRepository = getCustomRepository(NotificationRepository);
  await notificationRepository.update({ id: notificationId }, body);
  const notification = await notificationRepository.findById(notificationId);
  if (notification.type === EntityType.COMMENT) {
    const expandedNotification = await setSubtitleToComment(notification);
    return expandedNotification;
  } else if (notification.type === EntityType.PAGE) {
    const expandedNotification = await setSubtitleToPage(notification);
    return expandedNotification;
  } else {
    return mapNotificationToINotification(notification);
  }
};

export const updateReadForAll = async (
  userId: string,
  workspaceId: string,
  body: { read: boolean },
): Promise<INotification[]> => {
  const notificationRepository = getCustomRepository(NotificationRepository);
  const notifications =
    await notificationRepository.findAllByUserIdAndWorkspaceId(
      userId,
      workspaceId,
    );
  for (const notification of notifications) {
    await notificationRepository.update({ id: notification.id }, body);
  }
  return await getNotifications(userId, workspaceId);
};
