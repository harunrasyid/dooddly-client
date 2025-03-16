import { createContext, ReactNode, useContext } from "react";
import { Socket } from "socket.io-client";
import { socket } from "./socket";

interface SocketContextType {
  socket: Socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const newSocket = socket;

  return (
    <SocketContext.Provider value={{ socket: newSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};
