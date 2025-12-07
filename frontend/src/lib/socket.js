import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  const baseUrl =
    import.meta.env.VITE_SOCKET_URL?.trim().length
      ? import.meta.env.VITE_SOCKET_URL
      : import.meta.env.MODE === "development"
      ? "http://localhost:4000"
      : "https://smarthealthassistant-2.onrender.com";

  socket = io(baseUrl, {
    query: { userId },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};