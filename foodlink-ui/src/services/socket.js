import { io } from 'socket.io-client';

const isLocalhost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (isLocalhost ? 'http://localhost:5000' : '');

export const socket = SOCKET_URL
  ? io(SOCKET_URL, {
      autoConnect: true,
      transports: ['websocket', 'polling'],
      timeout: 3000,
    })
  : { on: () => {}, off: () => {}, emit: () => {}, connected: false };

