import { useEffect, useState } from "react";
import api from "../../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

/* 🔥 PROJECT CARD */
function ProjectCard({ project, onOpen }) {
  const { theme } = useTheme();

  const fixUrl = (url) => {
    if (!url) return null;
    url = url.trim();
    if (!url.startsWith("http")) return "https://" + url;
    return url;
  };

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
      {/* 🔥 GLOW BORDER */}
      {theme !== "light" && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
          <div className="absolute inset-0 border border-blue-500/40 rounded-2xl" />
        </div>
      )}

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:5000/uploads/${project.image}`}
          alt={project.title}
          className="w-full h-44 object-cover transition duration-500 group-hover:scale-110"
        />

        {/* 🔥 HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-5">
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

          {project.liveLink && (
            <a
              href={fixUrl(project.liveLink)}
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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`max-w-3xl w-full rounded-2xl p-6

          ${
            theme === "light"
              ? "bg-white shadow-xl"
              : "bg-gray-900 border border-gray-700"
          }`}
        >
          <div className="overflow-hidden rounded-xl mb-4">
            <motion.img
              src={`http://localhost:5000/uploads/${project.image}`}
              className="w-full h-64 object-cover"
              whileHover={{ scale: 1.1 }}
            />
          </div>

          <h2 className="text-2xl font-semibold">{project.title}</h2>
          <p className="mt-3 text-gray-400">{project.description}</p>

          <button
            onClick={onClose}
            className="mt-6 px-5 py-2 rounded-lg border border-gray-500/30 hover:bg-blue-500 hover:text-white transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* 🔥 MAIN PAGE */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
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
      className={`relative min-h-screen px-6 md:px-12 py-20 overflow-hidden transition-all duration-500
      ${theme === "light" ? "bg-white text-gray-900" : "bg-black text-white"}`}
    >
      {/* 🌌 SPACE BACKGROUND */}
      {theme !== "light" && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            {/* 🔥 GLASS OVERLAY */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* 🔥 CENTER ACTION BAR */}
            <div className="relative flex items-center gap-4 px-4 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              {projects.githubLink && (
                <a
                  href={fixUrl(projects.githubLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <FaGithub size={18} />
                </a>
              )}

              {projects.liveLink && (
                <a
                  href={fixUrl(projects.liveLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FiExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="absolute top-[-150px] left-1/3 w-[400px] h-[400px] bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-[-150px] right-1/3 w-[400px] h-[400px] bg-pink-500/10 blur-[120px]" />
        </>
      )}

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto mb-16 text-center"
      >
        <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3 mt-8">
          Portfolio
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Selected Work
        </h1>

        <p
          className={`mt-4 text-sm md:text-base max-w-xl mx-auto leading-relaxed
          ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
        >
          A collection of production-ready applications focused on performance,
          scalability, and clean architecture.
        </p>

        <div className="mt-8 flex justify-center">
          <div
            className={`h-[1px] w-20
            ${
              theme === "light"
                ? "bg-gradient-to-r from-transparent via-gray-400 to-transparent"
                : "bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            }`}
          />
        </div>
      </motion.div>

      {loading && <p className="text-center">Loading...</p>}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} onOpen={setSelected} />
        ))}
      </div>

      {/* MODAL */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
