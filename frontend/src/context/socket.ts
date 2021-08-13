import { io } from 'socket.io-client';
import { createContext } from 'react';

export const socket = io();
export const SocketContext = createContext(socket);
export const { Provider } = SocketContext;
