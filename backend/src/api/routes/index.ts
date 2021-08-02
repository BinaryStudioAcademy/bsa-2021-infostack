import { Express } from 'express';
import userRoute from './user-route';
import authRoute from './auth-route';
import pageRoute from './page-route';

const routes = (app: Express): void => {
  app.use('/api/users', userRoute);
  app.use('/api/pages', pageRoute);
  app.use('/api/auth', authRoute);
};
export default routes;
