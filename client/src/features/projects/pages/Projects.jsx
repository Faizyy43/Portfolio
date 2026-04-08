import { useEffect, useState } from "react";
import api from "../../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

/* 🔥 GLOBAL URL FIX */
const fixUrl = (url) => {
  if (!url) return "#";
  url = url.trim();

  // ✅ FIX: handle broken cases
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }

  return url;
};

/* 🔥 PROJECT CARD */
function ProjectCard({ project, onOpen }) {
  const { theme } = useTheme();
  const API = import.meta.env.VITE_API_URL;

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={() => onOpen(project)}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500
      ${
        theme === "light"
          ? "bg-white border border-gray-300 shadow-md hover:shadow-xl"
          : "bg-gray-900 border border-gray-700 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
      }`}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={
            project.image?.includes("res.cloudinary.com")
              ? project.image
              : project.image?.startsWith("http")
                ? project.image
                : `${API}/uploads/${project.image}`
          }
          alt={project.title}
          className="w-full h-44 object-cover transition duration-500 group-hover:scale-110"
        />

        {/* HOVER */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-5">
          {/* GITHUB */}
          {project.githubLink && (
            <a
              href={fixUrl(project.githubLink)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-gray-500/30 hover:bg-gray-200 transition hover:scale-110"
            >
              <FaGithub size={20} />
            </a>
          )}

          {/* LIVE FIXED */}
          {project.liveLink && (
            <a
              href={fixUrl(project.liveLink)} // ✅ FINAL FIX
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-gray-500/30 hover:bg-blue-500 transition hover:scale-110"
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>

        <p
          className={`text-sm mt-2 line-clamp-2 ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

/* 🔥 MODAL */
function ProjectModal({ project, onClose }) {
  const { theme } = useTheme();
  if (!project) return null;

  const API = import.meta.env.VITE_API_URL;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
          className={`max-w-3xl w-full rounded-2xl p-6
          ${theme === "light" ? "bg-white shadow-xl" : "bg-gray-900 border border-gray-700"}`}
        >
          <img
            src={
              project.image?.includes("res.cloudinary.com")
                ? project.image
                : project.image?.startsWith("http")
                  ? project.image
                  : `${API}/uploads/${project.image}`
            }
            className="w-full h-64 object-cover rounded-xl"
          />

          <h2 className="text-2xl mt-4 font-semibold">{project.title}</h2>
          <p className="mt-2 text-gray-400">{project.description}</p>

          {/* LIVE BUTTON IN MODAL */}
          {project.liveLink && (
            <a
              href={fixUrl(project.liveLink)}
              target="_blank"
              className="inline-block mt-4 px-4 py-2 bg-blue-500 rounded-lg"
            >
              Visit Project
            </a>
          )}

          <button
            onClick={onClose}
            className="mt-6 px-5 py-2 border rounded-lg hover:bg-blue-500"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* 🔥 MAIN */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className={`min-h-screen p-6 ${theme === "light" ? "bg-white" : "bg-black"}`}
    >
      {loading && <p className="text-center">Loading...</p>}

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} onOpen={setSelected} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
