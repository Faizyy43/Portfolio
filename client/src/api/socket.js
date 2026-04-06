import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // 🔥 important
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;