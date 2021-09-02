import { Socket } from 'socket.io';
import { SocketEvents } from '../common/enums/socket';
// import { IUser } from '../common/interfaces/user';
import // getEditors,
// addEditor,
// deleteEditor,
// getByUserId
'../services/page-content.service';

// import WebrtcConn from 'y-webrtc/bin/utils.js';
// import { setupWSConnection } from 'y-websocket/bin/utils.js';

// const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection;

// import ShareDB from 'sharedb';
// import JsonSocket from 'json-socket';
// import { DefaultEventsMap } from 'socket.io/dist/typed-events';

// const shareDBServer = new ShareDB();
// const connection = shareDBServer.connect();

export const handlers = (socket: Socket): void => {
  socket.on(SocketEvents.PAGE_JOIN, (pageId: string) => {
    socket.join(pageId);
    // WebrtcConn.
    // setupWSConnection.setupWSConnection;
    // setupWSConnection(socket);
  });
  socket.on(SocketEvents.APP_JOIN, (userId: string) => {
    socket.join(userId);
  });
  socket.on(
    SocketEvents.EDITOR_JOIN,
    async (pageContentId: string, userId: string) => {
      // socket.on(SocketEvents.EDITOR_JOIN, (userId: IUser | null) => {
      console.info(pageContentId, userId);
      socket.join(pageContentId);
      // await addEditor(pageContentId, userId);
      // const editors = await getEditors(pageContentId);
      // socket.emit(SocketEvents.EDITOR_JOIN, editors);

      // socket.in(pageContentId).emit(SocketEvents.EDITOR_JOIN, user);
    },
  );
  socket.on(
    SocketEvents.EDITOR_LEFT,
    async (pageContentId: string, userId: string) => {
      console.info(pageContentId, userId);
      socket.leave(pageContentId);
      // await deleteEditor(pageContentId, userId);
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
