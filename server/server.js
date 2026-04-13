// 🔥 LOAD ENV FIRST (VERY IMPORTANT)
import dotenv from "dotenv";
dotenv.config();

// 🔥 DEBUG (REMOVE AFTER TEST)
console.log(
  "RESEND_API_KEY:",
  process.env.RESEND_API_KEY ? "Loaded ✅" : "Missing ❌",
);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌");

import express from "express";
import cloudinary from "./config/cloudinary.js";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";
import emailRoutes from "./routes/email.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
const server = http.createServer(app);

/* ================= CORS (FINAL FIX) ================= */
const allowedOrigins = [
  "https://faizfolio-two.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS BLOCKED:", origin);
        return callback(null, false);
      }
    },
    credentials: true,
  }),
);

/* 🔥 PREFLIGHT FIX */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

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

/* ================= ROUTES ================= */
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api", uploadRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
