import { Socket } from 'socket.io';
import { SocketEvents } from '../common/enums/socket';

export const handlers = (socket: Socket): void => {
  socket.on(SocketEvents.PAGE_JOIN, (pageId: string) => {
    socket.join(pageId);
  });
};