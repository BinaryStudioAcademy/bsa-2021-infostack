import { MAX_NOTIFICATION_TITLE_LENGTH } from '../../constants/notification';

export const commentNotification = (
  author: string,
  text: string,
): [string, string] => {
  const title = `A new comment from ${author}`;
  const body = text.slice(0, MAX_NOTIFICATION_TITLE_LENGTH);

  return [title, body];
};
