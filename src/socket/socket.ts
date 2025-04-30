import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://dooddly-server.onrender.com";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  timeout: 10000,
});
