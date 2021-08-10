import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { env } from './env';
import routes from './api/routes';
import { logger } from './common/utils/logger.util';
import errorHandlerMiddleware from './api/middlewares/error-handler-middleware';
import { auth as authorizationMiddleware } from './api/middlewares/authorization-middleware';
import ormconfig from './config/ormconfig';
import { handlers as socketHandlers } from './socket/handlers';

const { port, socketPort } = env.app;

const app: Express = express();
const socketServer = createServer(app);
const io = new Server(socketServer);

io.on('connections', socketHandlers);

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

socketServer.listen(socketPort);

export default app;
