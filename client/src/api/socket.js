import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_URL;

export const createSocket = () => {
  return io(API, {
    transports: ["websocket"],
    auth: {
      token: localStorage.getItem("accessToken"),
    },
  });
};
