import { MAX_NOTIFICATION_TITLE_LENGTH } from '../../constants/notification';

export const mentionNotification = (
  author: string,
  text: string,
): [string, string] => {
  const title = `You have been mention in a comment by ${author}`;
  const body = text.slice(0, MAX_NOTIFICATION_TITLE_LENGTH);

  return [title, body];
};
