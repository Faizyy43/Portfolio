import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
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

/* ================= CORS (FIXED PROPERLY) ================= */
const allowedOrigins = [
  "https://faizfolio-two.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps / postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= SOCKET.IO ================= */
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
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

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

/* ================= STATIC ================= */
app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/reviews", reviewRoutes);

/* ================= HEALTH CHECK (VERY IMPORTANT) ================= */
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
