import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js"; // ✅ ADD
import streamifier from "streamifier"; // ✅ ADD

export const createProject = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      try {
        const streamUpload = () => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "projects" },
              (error, result) => {
                if (result) resolve(result);
                else reject(error);
              },
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });
        };

        const result = await streamUpload();
        imageUrl = result.secure_url;
      } catch (err) {
        console.log("❌ Cloudinary error:", err.message);
      }
    }

    const project = await Project.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json(project);
  } catch (err) {
    console.log("❌ CREATE ERROR:", err.message); // 🔥 ADD DEBUG
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET ALL
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// ✏️ UPDATE
export const updateProject = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            },
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      updateData.image = result.secure_url;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.log("❌ UPDATE ERROR:", err.message); // 🔥 DEBUG
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
