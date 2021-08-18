import { Notification } from 'src/data/entities/notification';
import { INotification } from '../../interfaces/notification';
import { EntityType } from '../../enums/entity-type';

export const mapNotificationToINotification = (
  notification: Notification,
): INotification => {
  const { id, title, body, type, read, createdAt } = notification;
  return {
    id,
    title,
    body,
    type: type as EntityType,
    read,
    createdAt: createdAt?.toISOString(),
  };
};
