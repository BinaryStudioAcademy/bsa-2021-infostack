import { Express } from 'express';
import userRoute from './user-route';
import workspaceRoute from './workspace-route';

const routes = (app: Express): void => {
  app.use('/api/users', userRoute);
  app.use('/api/workspace', workspaceRoute);
};

export default routes;
