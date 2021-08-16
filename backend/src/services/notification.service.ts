import { getCustomRepository } from 'typeorm';
// import { Server } from 'socket.io';
import { INotification } from '../common/interfaces/notification';
import CommentRepository from '../data/repositories/comment.repository';
import PageRepository from '../data/repositories/page.repository';

export const getNotifications = async (
  _userId: string,
): Promise<INotification[]> => {
  // const notifications = await getCustomRepository(NotificationRepository).findByUserId(userId);
  const notifications = [
    {
      id: '999953a1-e0dc-4553-80df-b78aafa612ba',
      title: 'New comment from user1',
      body: '111111111111111111',
      type: 'comment',
      entityTypeId: '988953a1-e0dc-4553-80df-b78aafa612ba',
      createdAt: '2021-08-16 17:52:13.433231',
    },
    {
      id: '959953a1-e0dc-4553-80df-b78aafa612ba',
      title: 'New comment from user1',
      body: '22222222222222222222222222',
      type: 'comment',
      entityTypeId: 'd7922582-4737-4730-b14b-20765fc6816b',
      createdAt: '2021-08-16 17:52:18.03367',
    },
    {
      id: '919953a1-e0dc-4553-80df-b78aafa612ba',
      title: 'New comment from user1',
      body: '3333333333333333333333',
      type: 'comment',
      entityTypeId: 'da9d6569-ad93-4a25-8c7a-555ed925f1eb',
      createdAt: '2021-08-16 17:52:19.433231',
    },
  ];
  const commentNotifications = notifications.filter(
    (notification) => notification.type === 'comment',
  );
  if (!commentNotifications.length) {
    return notifications;
  } else {
    const expandedNotifications = notifications.filter(
      (notification) => notification.type !== 'comment',
    ) as INotification[];
    const commentRepository = getCustomRepository(CommentRepository);
    const pageRepository = getCustomRepository(PageRepository);
    for (const notification of commentNotifications) {
      const comment = await commentRepository.findOneById(
        notification.entityTypeId,
      );
      const page = await pageRepository.findByIdWithLastContent(comment.pageId);
      expandedNotifications.push({
        ...notification,
        subtitle: page.pageContents[0].title,
      });
    }
    return expandedNotifications;
  }
};
