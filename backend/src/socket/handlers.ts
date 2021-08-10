import { Socket } from 'socket.io';
import { logger } from '../common/utils/logger.util';

export const handlers = (socket: Socket): void => {
  logger.info(`Socket connected ${socket.id}`);

  socket.on('page/join', (pageId: string) => {
    socket.join(pageId);
  });
};
