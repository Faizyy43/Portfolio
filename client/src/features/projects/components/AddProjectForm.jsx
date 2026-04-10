import { useState, useEffect } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import axios from "axios";

export default function AddProjectForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // 🔥 CLEAN PREVIEW MEMORY (IMPORTANT)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      return toast.error("Title & Description required ⚠️");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("githubLink", form.github);
      formData.append("liveLink", form.live);

      // 🔥 IMPORTANT FIX
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      console.log("FORM IMAGE:", form.image); // DEBUG

      await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        method: "POST",
        body: formData,
      });

      toast.success("Project Added 🚀");

      setForm({
        title: "",
        description: "",
        github: "",
        live: "",
        image: null,
      });

      setPreview(null);
      refresh();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="
        relative p-6 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-xl
        grid md:grid-cols-2 gap-4
      "
    >
      {/* Title */}
      <input
        value={form.title}
        placeholder="Project Title"
        className="input-premium"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Github */}
      <input
        value={form.github}
        placeholder="GitHub Link"
        className="input-premium"
        onChange={(e) => setForm({ ...form, github: e.target.value })}
      />

      {/* Description */}
      <input
        value={form.description}
        placeholder="Description"
        className="input-premium md:col-span-2"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Live */}
      <input
        value={form.live}
        placeholder="Live Link"
        className="input-premium md:col-span-2"
        onChange={(e) => setForm({ ...form, live: e.target.value })}
      />

      {/* File Upload */}
      <div className="md:col-span-2">
        <label
          className="
            flex flex-col items-center justify-center
            border border-dashed border-white/20
            rounded-xl p-6 cursor-pointer
            hover:bg-white/5 transition
          "
        >
          <UploadCloud className="w-6 h-6 mb-2 text-gray-400" />

          <span className="text-sm text-gray-400">
            Click to upload project image
          </span>

          {/* <input
            type="file"
            name="image0"
            accept="image/*" // ✅ ADD (only images)
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm({ ...form, image: file });

              if (file) {
                // 🔥 REPLACE OLD PREVIEW (avoid memory leak)
                if (preview) URL.revokeObjectURL(preview);

                setPreview(URL.createObjectURL(file));
              }
            }}
          /> */}

          <input
            type="file"
            name="image" // ✅ MUST MATCH BACKEND
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];

              console.log("SELECTED FILE:", file); // DEBUG

              if (!file) return;

              setForm((prev) => ({
                ...prev,
                image: file, // ✅ MUST BE FILE OBJECT
              }));

              if (preview) URL.revokeObjectURL(preview);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-3 w-full h-40 object-cover rounded-lg border border-white/10"
          />
        )}
      </div>

      {/* Button */}
      <button
        disabled={loading}
        className={`
          md:col-span-2 py-3 rounded-xl font-semibold
          transition-all duration-300
          ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 hover:scale-[1.01]"
          }
        `}
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}
