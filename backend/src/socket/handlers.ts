import { Socket } from 'socket.io';
import { IPageContributor } from '../common/interfaces/page';
import { SocketEvents } from '../common/enums/socket';
import { IUser } from '../common/interfaces/user';
import { env } from '../env';

let page_editors: { pageId: string; user: IPageContributor }[] = [];
let isContentInserted: boolean = false;

export const handlers = (socket: Socket): void => {
  socket.on(SocketEvents.PAGE_JOIN, (pageId: string) => {
    socket.join(pageId);
  });
  socket.on(SocketEvents.APP_JOIN, (userId: string) => {
    socket.join(userId);
  });
  socket.on(SocketEvents.EDITOR_JOIN, async (pageId: string, user: IUser) => {
    socket.join(pageId);
    const { id, fullName, avatar } = user;
    page_editors.push({ pageId, user: { id, fullName, avatar } });
    socket.emit(SocketEvents.CONTENT_INSERTED, isContentInserted);
    socket.in(pageId).emit(SocketEvents.CONTENT_INSERTED, isContentInserted);
    await showEditors(socket, pageId);
  });
  socket.on(SocketEvents.CONTENT_INSERTED, (isInserted: boolean) => {
    isContentInserted = isInserted;
  });
  socket.on(
    SocketEvents.EDITOR_LEFT,
    async (pageId: string, userId: string) => {
      socket.leave(pageId);
      page_editors = page_editors.filter(
        (page_editor) => page_editor.user.id !== userId,
      );
      if (page_editors.length == 0) {
        isContentInserted = false;
      }
      await showEditors(socket, pageId);
    },
  );
  socket.on(SocketEvents.SIGN_OUT, (userId: string, pageId?: string) => {
    pageId && socket.leave(pageId);
    socket.leave(userId);
  });
};

const showEditors = async (socket: Socket, pageId: string): Promise<void> => {
  const editors = page_editors
    .filter((page_editor) => page_editor.pageId === pageId)
    .map(({ user }) => user);
  const url = env.app;
  socket.emit(SocketEvents.EDITOR_JOIN, editors, url.url, isContentInserted);
  socket
    .in(pageId)
    .emit(SocketEvents.EDITOR_JOIN, editors, url.url, isContentInserted);
};
