import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import { env } from './env';
import routes from './api/routes';
import { logger } from './common/utils/logger.util';
import errorHandlerMiddleware from './api/middlewares/error-handler-middleware';

const { port } = env.app;

const app: Express = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use(errorHandlerMiddleware);

app.listen(port, async () => {
  try {
    await createConnection();
  } catch (error) {
    logger.info(`'App started with error: ${error}`);
  }
  logger.info(`Server is running at ${port}.`);
});

export default app;
