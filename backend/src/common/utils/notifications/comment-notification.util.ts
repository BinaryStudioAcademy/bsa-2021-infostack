import { MAX_NOTIFICATION_TITLE_LENGTH } from '../../constants/notification';
import { NotificationGen } from '../../types';

export const commentNotification = (
  author: string,
  text: string,
): NotificationGen => {
  const title = `A new comment from ${author}`;
  const body = text.slice(0, MAX_NOTIFICATION_TITLE_LENGTH);

  return { title, body };
};
