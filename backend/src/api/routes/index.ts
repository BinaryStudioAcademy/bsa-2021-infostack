import { Express } from 'express';
import userRoute from './user-route';
import authRoute from './auth-route';

const routes = (app: Express): void => {
  app.use('/api/user', userRoute);
  app.use('/api/auth', authRoute);
};

export default routes;
