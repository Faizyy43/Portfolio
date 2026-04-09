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

        {/* 🔥 HOVER ICONS */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-5">
          {project.githubLink && (
            <a
              href={fixUrl(project.githubLink)}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-white/10 hover:bg-gray-200 transition"
            >
              <FaGithub size={20} />
            </a>
          )}

          {project.liveLink && (
            <a
              href={fixUrl(project.liveLink)}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition"
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm mt-2 opacity-70 line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

/* 🔥 MODAL (UPDATED PROFESSIONAL) */
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

          {/* 🔥 ICONS IN MODAL (NO BUTTONS NOW) */}
          <div className="flex gap-4 mt-5">
            {project.githubLink && (
              <a
                href={fixUrl(project.githubLink)}
                target="_blank"
                className="p-3 rounded-full bg-white/10 hover:bg-gray-200 transition"
              >
                <FaGithub size={20} />
              </a>
            )}

            {project.liveLink && (
              <a
                href={fixUrl(project.liveLink)}
                target="_blank"
                className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 border rounded-lg hover:bg-blue-500"
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
    <div className="relative min-h-screen px-6 py-12 bg-black text-white overflow-hidden">
      {/* 🌌 STAR GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 🌈 TOP GLOW (same like your About/Home) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-40" />

      {/* ✅ YOUR ORIGINAL CONTENT */}
      <div className="relative z-10">
        {/* 🔥 PROFESSIONAL HEADER */}
        <div className="text-center mb-14 pt-16">
          {/* SMALL TITLE */}
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Portfolio
          </p>

          {/* MAIN TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-white">
            Selected Work
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-xl mx-auto text-gray-400">
            A collection of production-ready applications focused on
            performance, scalability, and clean architecture.
          </p>

          {/* 🔥 BLUE SHINE LINE */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-28 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent">
              {/* glow */}
              <div className="absolute inset-0 blur-md bg-blue-500/60 animate-pulse" />

              {/* center highlight */}
              <div className="absolute left-1/2 -translate-x-1/2 w-10 h-[2px] bg-blue-400" />
            </div>
          </div>
        </div>

        {loading && <p className="text-center">Loading...</p>}

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} onOpen={setSelected} />
          ))}
        </div>

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}
