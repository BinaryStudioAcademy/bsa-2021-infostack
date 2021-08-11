import { Request } from 'express';
import { Server } from 'socket.io';

export interface RequestWithSocket extends Request {
  io?: Server;
}
