import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://dooddly-server-fe6f5300467a.herokuapp.com";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  timeout: 10000,
});
