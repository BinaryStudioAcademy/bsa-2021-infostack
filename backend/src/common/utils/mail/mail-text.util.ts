import { MailGen } from '../../types';

export const prMail = (prTitle: string, url: string): MailGen => {
  const subject = `A pull request "${prTitle}" was merged`;
  const text = `
  Hello,

  A page you are following has such tags as merged pull request. Maybe you should update the page.

  ${url}`;

  return { subject, text };
};
