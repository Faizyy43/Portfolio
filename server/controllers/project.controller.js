import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// 🔥 COMMON UPLOAD FUNCTION (REUSABLE)
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return resolve(null); // ✅ prevent crash
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "projects" },
      (error, result) => {
        if (error) {
          console.log("❌ Cloudinary Upload Error:", error.message);
          return reject(error);
        }
        resolve(result);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// ➕ CREATE
export const createProject = async (req, res) => {
  try {
    console.log("===== DEBUG START =====");
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    console.log("===== DEBUG END =====");

    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      if (result) {
        imageUrl = result.secure_url;
      }
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const project = await Project.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json(project);
  } catch (err) {
    console.log("❌ CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET ALL
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.log("❌ FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE
export const updateProject = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // ✅ CHECK ID VALID
    if (!req.params.id) {
      return res.status(400).json({ error: "Project ID missing" });
    }

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file);
        if (result) {
          updateData.image = result.secure_url;
        }
      } catch (err) {
        console.log("❌ Cloudinary UPDATE error:", err.message);
      }
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("❌ UPDATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log("❌ DELETE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
