export const commentMail = (
  author: string,
  commentText: string,
  url: string,
): [string, string] => {
  const subject = 'A new comment to the page you are following';
  const text = `
  Hello,

  A page you are following received a new comment from ${author}:

  "${commentText}"

  ${url}`;

  return [subject, text];
};
