import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import api from "../../../api/api";
import toast from "react-hot-toast";
import { X, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditModal({ project, close, refresh }) {
  const modalRoot = document.getElementById("modal-root");

  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ INIT DATA
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        github: project.githubLink || "",
        live: project.liveLink || "",
        image: null,
      });

      setPreview(project.image || null);
    }
  }, [project]);

  // ✅ LOCK SCROLL (IMPORTANT)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // ✅ ESC CLOSE
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [close]);

  const update = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("githubLink", form.github);
      formData.append("liveLink", form.live);

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.put(`/projects/${project._id}`, formData);

      toast.success("Updated 🚀");
      refresh();
      close();
    } catch (err) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 🔥 BACKDROP */}
        <div
          onClick={close}
          className="absolute inset-0 bg-black/70 backdrop-blur-lg"
        />

        {/* 💎 MODAL */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="
            relative w-full max-w-md
            bg-[#0b0f19]/95
            border border-white/10
            rounded-2xl p-6
            shadow-2xl
          "
        >
          {/* CLOSE */}
          <button
            onClick={close}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>

          <h2 className="text-lg font-semibold mb-4">Edit Project</h2>

          <div className="space-y-3">
            <input
              value={form.title}
              className="input-premium"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
            />

            <input
              value={form.github}
              className="input-premium"
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="GitHub"
            />

            <input
              value={form.description}
              className="input-premium"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
            />

            <input
              value={form.live}
              className="input-premium"
              onChange={(e) => setForm({ ...form, live: e.target.value })}
              placeholder="Live Link"
            />
          </div>

          {/* Upload */}
          <div className="mt-4">
            <label className="upload-box">
              <UploadCloud className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Change Image</span>

              <input
  type="file"
  accept="image/*" // ✅ restrict images
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      // 🔥 CLEAN OLD PREVIEW (IMPORTANT)
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      setPreview(URL.createObjectURL(file));
    }
  }}
/>
            </label>

            {preview && (
              <img
                src={preview}
                className="mt-3 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={update}
              className="flex-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              onClick={close}
              className="flex-1 py-2 rounded-xl bg-red-500/20 text-red-400"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot,
  );
}
