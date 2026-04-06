import express from "express";
import {
  submitContact,
  getAllContacts,
  getNotification,
} from "../controllers/contact.controller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("file"), submitContact);
router.get("/", getAllContacts);
router.post("/", getNotification)

export default router;
