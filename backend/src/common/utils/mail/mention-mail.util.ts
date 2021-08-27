import { MailGen } from '../../types';

export const mentionMail = (
  author: string,
  commentText: string,
  url: string,
): MailGen => {
  const subject = 'You have been mentioned in a comment';
  const text = `
  Hello,

  You have been mentioned in a comment by ${author}:

  "${commentText}"

  ${url}`;

  return { subject, text };
};
