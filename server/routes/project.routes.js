import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

// ➕ CREATE (Admin)
router.post("/", upload.single("image"), createProject);

// 📥 GET ALL (Public)
router.get("/", getProjects);

// ✏️ UPDATE
router.put("/:id", upload.single("image"), updateProject);

// ❌ DELETE
router.delete("/:id", deleteProject);

export default router;
