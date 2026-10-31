import { io } from 'socket.io-client';

// Only connect if explicitly configured via environment variable to prevent localhost:5000 offline spam
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = SOCKET_URL
  ? io(SOCKET_URL, {
      autoConnect: true,
      transports: ['websocket', 'polling'],
      timeout: 3000,
      reconnectionAttempts: 3,
    })
  : {
      on: () => {},
      off: () => {},
      emit: () => {},
      connected: false,
    };
