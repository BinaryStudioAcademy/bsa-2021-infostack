import { Express } from 'express';
import userRoute from './user-route';
import authRoute from './auth-route';
import { auth } from '../middlewares/authorization-middleware';
import { checkWorkspace } from '../middlewares/check-workspace-middleware';

const routes = (app: Express): void => {
  app.use('/api/users', auth, checkWorkspace, userRoute);
  app.use('/api/login', authRoute);
};

export default routes;
