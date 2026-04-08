import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createProject);

router.get("/", getProjects);

router.put("/:id", upload.single("image"), updateProject);

router.delete("/:id", deleteProject);

export default router;
