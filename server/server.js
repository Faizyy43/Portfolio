import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";
import emailRoutes from "./routes/email.routes.js";
import reviewRoutes from "./routes/review.routes.js";

// ✅ ENV
dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ CORS FIXED
app.use(
  cors({
    origin: "https://faizfolio-two.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());

// 🔥 SOCKET
const io = new Server(server, {
  cors: {
    origin: "https://faizfolio-two.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    socket.user = decoded;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.set("io", io);

// ✅ DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// ✅ static
app.use("/uploads", express.static("uploads"));

// ✅ routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/reviews", reviewRoutes);

// ✅ PORT FIXED
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
