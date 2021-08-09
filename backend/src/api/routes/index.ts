import { Express } from 'express';
import userRoute from './user-route';
import authRoute from './auth-route';
import pageRoute from './page-route';
import workspaceRoute from './workspace-route';
import skillRoute from './skill-route';

const routes = (app: Express): void => {
  app.use('/api/users', userRoute);
  app.use('/api/pages', pageRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/workspaces', workspaceRoute);
  app.use('/api/skills', skillRoute);
};
export default routes;
