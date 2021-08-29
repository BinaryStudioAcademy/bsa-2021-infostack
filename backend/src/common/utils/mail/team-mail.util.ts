import { MailGen } from '../../types';

export const teamMailAddUser = (
  workspaceName: string,
  teamName: string,
  url: string,
): MailGen => {
  const subject = `You have been added to team "${teamName}".`;
  const text = `
  Hello,

  You have been added to team "${teamName}" in ${workspaceName}. You will be able to view the pages that are available to team.

  ${url}`;

  return { subject, text };
};

export const teamMailDeleteUser = (
  workspaceName: string,
  teamName: string,
  url: string,
): MailGen => {
  const subject = `You have been deleted from team "${teamName}".`;
  const text = `
  Hello,

  You have been deleted from team "${teamName}" in ${workspaceName}. You will no longer be able to view the pages that were available to you as a team participant.

  ${url}`;

  return { subject, text };
};

export const teamMailDelete = (
  workspaceName: string,
  teamName: string,
  url: string,
): MailGen => {
  const subject = `Team "${teamName}" in ${workspaceName} was deleted`;
  const text = `
  Hello,

  The team you were a participant of has been deleted. You will no longer be able to view the pages that were available to you as a team participant.

  ${url}`;

  return { subject, text };
};
