export const replyMail = (
  author: string,
  commentText: string,
  url: string,
): [string, string] => {
  const subject = 'A new response to your comment';
  const text = `
  Hello,

  You received a response from ${author} to your comment:

  "${commentText}"

  ${url}`;

  return [subject, text];
};
