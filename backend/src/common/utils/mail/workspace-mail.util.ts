import { MailGen } from '../../types';

export const workspaceMailDeleteUser = (
  workspaceName: string,
  url: string,
): MailGen => {
  const subject = `You have been deleted from workspace "${workspaceName}".`;
  const text = `
  Hello,

  You have been deleted from workspace "${workspaceName}". You will no longer be able to view the pages or another information from workspace "${workspaceName}".

  ${url}`;

  return { subject, text };
};
