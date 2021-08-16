import { NextFunction, Response } from 'express';
import { Server } from 'socket.io';
import { RequestWithSocket } from '../../common/interfaces/socket';

export const socketInjector =
  (io: Server) =>
  (req: RequestWithSocket, _: Response, next: NextFunction): void => {
    req.io = io;
    next();
  };
