import { Express } from 'express';
import userRoute from './user-route';

const routes = (app: Express): void => {
  app.use('/api/user', userRoute);
};

export default routes;
