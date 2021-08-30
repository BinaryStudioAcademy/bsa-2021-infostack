import { Socket } from 'socket.io';
import { SocketEvents } from '../common/enums/socket';
import { IUser } from '../common/interfaces/user';

export const handlers = (socket: Socket): void => {
  socket.on(SocketEvents.PAGE_JOIN, (pageId: string) => {
    socket.join(pageId);
    // console.info('there', pageId);
  });
  socket.on(SocketEvents.APP_JOIN, (userId: string) => {
    socket.join(userId);
  });
  socket.on(SocketEvents.EDITOR_JOIN, (pageContentId: string, user: IUser) => {
    // console.info('there', user);
    // socket.on(SocketEvents.EDITOR_JOIN, (userId: IUser | null) => {
    socket.join(pageContentId);
    socket.emit(SocketEvents.EDITOR_JOIN, user);
    // socket.in(pageContentId).emit(SocketEvents.EDITOR_JOIN, user);
  });
  // socket.on(SocketEvents.EDITOR_LEFT, (pageContentId: string, user: IUser) => {
  //   socket.leave(pageContentId);
  // });
};
