import { Socket } from 'socket.io';
import { SocketEvents } from '../common/enums/socket';
// import { IUser } from '../common/interfaces/user';
import {
  getEditors,
  addEditor,
  deleteEditor,
} from '../services/page-content.service';

export const handlers = (socket: Socket): void => {
  socket.on(SocketEvents.PAGE_JOIN, (pageId: string) => {
    socket.join(pageId);
  });
  socket.on(SocketEvents.APP_JOIN, (userId: string) => {
    socket.join(userId);
  });
  socket.on(
    SocketEvents.EDITOR_JOIN,
    async (pageContentId: string, userId: string) => {
      // socket.on(SocketEvents.EDITOR_JOIN, (userId: IUser | null) => {
      socket.join(pageContentId);
      await addEditor(pageContentId, userId);
      const editors = await getEditors(pageContentId);
      socket.emit(SocketEvents.EDITOR_JOIN, editors);

      // socket.in(pageContentId).emit(SocketEvents.EDITOR_JOIN, user);
    },
  );
  socket.on(
    SocketEvents.EDITOR_LEFT,
    async (pageContentId: string, userId: string) => {
      socket.leave(pageContentId);
      await deleteEditor(pageContentId, userId);
    },
  );
};
