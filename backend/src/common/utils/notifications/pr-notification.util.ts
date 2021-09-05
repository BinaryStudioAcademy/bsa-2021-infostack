import { NotificationGen } from '../../types';

export const prNotification = (prTitle: string): NotificationGen => {
  const title = `A pull request "${prTitle}" was merged`;
  const body = 'Maybe you should update the page';

  return { title, body };
};
