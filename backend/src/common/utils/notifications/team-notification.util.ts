import { NotificationGen } from '../../types';

export const teamNotificationAddUser = (
  workspaceName: string,
  teamName: string,
): NotificationGen => {
  const title = `You have been added to team "${teamName}" in ${workspaceName}.`;
  return { title };
};

export const teamNotificationDeleteUser = (
  workspaceName: string,
  teamName: string,
): NotificationGen => {
  const title = `You have been deleted from team "${teamName}" in ${workspaceName}`;
  return { title };
};

export const teamNotificationDelete = (
  workspaceName: string,
  teamName: string,
): NotificationGen => {
  const title = `Team "${teamName}" in ${workspaceName} was deleted`;
  return { title };
};
