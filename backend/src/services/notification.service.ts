import { getCustomRepository } from 'typeorm';
// import { Server } from 'socket.io';
import { INotification } from '../common/interfaces/notification';
import CommentRepository from '../data/repositories/comment.repository';
import NotificationRepository from '../data/repositories/notification.repository';
import PageRepository from '../data/repositories/page.repository';
import { mapNatoficationToINatofication } from '../common/mappers/notification/map-notification-to-inotification';

export const getNotifications = async (
  userId: string,
  limit: number,
): Promise<INotification[]> => {
  const notificationRepository = getCustomRepository(NotificationRepository);
  const notifications = limit
    ? await notificationRepository.findSomeByUserId(userId, limit)
    : await notificationRepository.findAllByUserId(userId);

  const commentNotifications = notifications.filter(
    (notification) => notification.type === 'comment',
  );
  if (!commentNotifications.length) {
    return notifications.map(mapNatoficationToINatofication);
  } else {
    const expandedNotifications = notifications
      .filter((notification) => notification.type !== 'comment')
      .map(mapNatoficationToINatofication);
    const commentRepository = getCustomRepository(CommentRepository);
    const pageRepository = getCustomRepository(PageRepository);
    for (const notification of commentNotifications) {
      const comment = await commentRepository.findOneById(
        notification.entityTypeId,
      );
      const page = await pageRepository.findByIdWithLastContent(comment.pageId);
      expandedNotifications.push({
        ...mapNatoficationToINatofication(notification),
        subtitle: page.pageContents[0].title,
      });
    }
    return expandedNotifications;
  }
};

export const getNotificationsCount = async (
  userId: string,
): Promise<{ count: number }> => {
  const notificationRepository = getCustomRepository(NotificationRepository);
  const notifications = await notificationRepository.findAllByUserId(userId);
  const count = notifications.filter(
    (notification) => !notification.read,
  ).length;
  return { count };
};
