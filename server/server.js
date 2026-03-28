import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// server
app.listen(5000, () => console.log("Server running on port 5000"));