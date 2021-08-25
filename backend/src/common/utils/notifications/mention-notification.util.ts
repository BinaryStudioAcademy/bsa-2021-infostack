import { MAX_NOTIFICATION_TITLE_LENGTH } from '../../constants/notification';
import { NotificationGen } from '../../types';

export const mentionNotification = (
  author: string,
  text: string,
): NotificationGen => {
  const title = `You have been mention in a comment by ${author}`;
  const body = text.slice(0, MAX_NOTIFICATION_TITLE_LENGTH);

  return { title, body };
};
