import { Express } from 'express';
import userRoute from './user-route';
import authRoute from './auth-route';
import pageRoute from './page-route';
import workspaceRoute from './workspace-route';
import tagRoute from './tag-route';
import teamRoute from './team-route';
import skillRoute from './skill-route';
import commentReactionRoute from './comment-route';
import notificationRoute from './notification-route';
import githubRoute from './github-route';
import linkRoute from './link-route';
import notificationSettingsRoute from './notification-settings-route';

const routes = (app: Express): void => {
  app.use('/api/users', userRoute);
  app.use('/api/pages', pageRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/workspaces', workspaceRoute);
  app.use('/api/tags', tagRoute);
  app.use('/api/teams', teamRoute);
  app.use('/api/skills', skillRoute);
  app.use('/api/comments', commentReactionRoute);
  app.use('/api/notifications', notificationRoute);
  app.use('/api/github', githubRoute);
  app.use('/api/links', linkRoute);
  app.use('/api/notifications-settings', notificationSettingsRoute);
};
export default routes;
