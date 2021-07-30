import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import { env } from './env';
import routes from './api/routes';
import { logger } from './common/utils/logger.util';

const { port } = env.app;

const app: Express = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../../build', '/public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

routes(app);

app.listen(port, async () => {
  try {
    await createConnection();
  } catch (error) {
    logger.info(`'App started with error: ${error}`);
  }
  logger.info(`Server is running at ${port}.`);
});

export default app;
