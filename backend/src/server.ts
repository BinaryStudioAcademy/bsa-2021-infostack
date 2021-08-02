import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { env } from './env';
import routes from './api/routes';
import { logger } from './common/utils/logger.util';
import errorHandlerMiddleware from './api/middlewares/error-handler-middleware';
import { auth as authorizationMiddleware } from './api/middlewares/authorization-middleware';
import ormconfig from './config/ormconfig';

const { port } = env.app;

const app: Express = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/', authorizationMiddleware);

routes(app);

app.use(errorHandlerMiddleware);

app.use('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, async () => {
  try {
    await createConnection(ormconfig);
  } catch (error) {
    logger.info(`'App started with error: ${error}`);
  }
  logger.info(`Server is running at ${port}.`);
});

export default app;
