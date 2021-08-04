import { Express } from 'express';
import userRoute from './user-route';
import authRoute from './auth-route';
import workspaceRoute from './workspace-route';
import settingsRoute from './settings-route';

const routes = (app: Express): void => {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/workspaces', workspaceRoute);
  app.use('/api/settings', settingsRoute);
};

export default routes;
