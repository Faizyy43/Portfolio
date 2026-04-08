import express from "express";
import {
  submitContact,
  getAllContacts,
  getNotification,
  updateContactStatus, // ✅ ADD THIS
} from "../controllers/contact.controller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("file"), submitContact);
router.get("/", getAllContacts);
router.post("/notify", getNotification); // 🔥 FIX duplicate route
router.put("/:id", updateContactStatus); // ✅ ADD THIS

export default router;
