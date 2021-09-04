import { Socket } from 'socket.io';
import { SocketEvents } from '../common/enums/socket';
import {
  getEditors,
  addEditor,
  deleteEditor,
  // getByUserId,
} from '../services/page.service';

export const handlers = (socket: Socket): void => {
  socket.on(SocketEvents.PAGE_JOIN, (pageId: string) => {
    socket.join(pageId);
  });
  socket.on(SocketEvents.APP_JOIN, (userId: string) => {
    socket.join(userId);
  });
  socket.on(
    SocketEvents.EDITOR_JOIN,
    async (pageId: string, userId: string) => {
      console.info(userId);
      await addEditor(pageId, userId);
      const editors = await getEditors(pageId);
      socket.emit(SocketEvents.EDITOR_JOIN, editors);
      // socket.in(pageContentId).emit(SocketEvents.EDITOR_JOIN, user);
    },
  );
  socket.on(
    SocketEvents.EDITOR_LEFT,
    async (pageId: string, userId: string) => {
      socket.leave(pageId);
      await deleteEditor(pageId, userId);
    },
  );
  socket.on(
    SocketEvents.EDITOR_NEW_CONTENT,
    async (userId: string, title: string, content: string) => {
      // const doc = connection.get('documents', 'firstDocument');
      // doc.fetch(() => {

      // const jsonStream = new JsonSocket(socket);
      // shareDBServer.listen(jsonStream);

      // const pageContentId = await getByUserId(userId);
      console.info(userId);
      // const pageContentId = 'f2f42def-4279-4cbd-a9de-8112f6f102f4';
      socket
        .in('f2f42def-4279-4cbd-a9de-8112f6f102f4')
        .emit(SocketEvents.EDITOR_NEW_CONTENT, title, content);
      // socket.emit(SocketEvents.EDITOR_NEW_CONTENT, title, content);
      // console.info(title, content);
      // socket.to(socket.id).emit(SocketEvents.EDITOR_NEW_CONTENT, title, content);
      // });
    },
  );
};
