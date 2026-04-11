import express from "express";
import {
  submitContact,
  getAllContacts,
  updateContactStatus, // ✅ ADD THIS
} from "../controllers/contact.controller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("file"), submitContact);
router.get("/", getAllContacts);
router.put("/:id", updateContactStatus); // ✅ ADD THIS

export default router;
