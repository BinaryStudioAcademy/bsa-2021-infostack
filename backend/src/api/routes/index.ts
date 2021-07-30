import { Express } from 'express';
import cookieParser from 'cookie-parser';
import userRoute from './user-route';
import authRoute from './auth-route';
import { auth, checkWorkspace } from '../middlewares/authorization-middleware';

const routes = (app: Express): void => {
  app.use(cookieParser());
  app.use('/api/users', auth, checkWorkspace, userRoute);
  app.use('/api/login', authRoute);

};

export default routes;
