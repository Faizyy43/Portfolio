// import express from "express";
// import multer from "multer";
// import cloudinary from "../config/cloudinary.js";

// const router = express.Router();

// // temp storage
// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);

//     res.json({
//       image: result.secure_url,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// export default router;

import express from "express";
import { upload } from "../middleware/upload.js"; // ✅ USE THIS
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔥 BUFFER → CLOUDINARY
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "projects" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    res.json({
      image: result.secure_url,
    });

  }catch (error) {
  console.log("❌ FULL ERROR:", error);
  console.log("❌ MESSAGE:", error.message);
  console.log("❌ STACK:", error.stack);

  res.status(500).json({
    error: error.message,
  });
}
});

export default router;