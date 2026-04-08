import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// temp storage
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    res.json({
      image: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;