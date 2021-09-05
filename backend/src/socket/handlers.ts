import { Socket } from 'socket.io';
import { SocketEvents } from '../common/enums/socket';
import { IUser } from '../common/interfaces/user';
import { getEditors, addEditor, deleteEditor } from '../services/page.service';
import { env } from '../env';

export const handlers = (socket: Socket): void => {
  socket.on(SocketEvents.PAGE_JOIN, (pageId: string) => {
    socket.join(pageId);
  });
  socket.on(SocketEvents.APP_JOIN, (userId: string) => {
    socket.join(userId);
  });
  socket.on(SocketEvents.EDITOR_JOIN, async (pageId: string, user: IUser) => {
    socket.join(pageId);
    await addEditor(pageId, user.id);
    await showEditors(socket, pageId);
  });
  socket.on(
    SocketEvents.EDITOR_LEFT,
    async (pageId: string, userId: string) => {
      socket.leave(pageId);
      await deleteEditor(pageId, userId);
      await showEditors(socket, pageId);
    },
  );
};

const showEditors = async (socket: Socket, pageId: string): Promise<void> => {
  const editors = await getEditors(pageId);
  const url = env.app;
  socket.emit(SocketEvents.EDITOR_JOIN, editors, url.url);
  socket.in(pageId).emit(SocketEvents.EDITOR_JOIN, editors, url.url);
};
