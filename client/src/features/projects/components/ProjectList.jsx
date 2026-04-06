import { useState } from "react";
import api from "../../../api/api";
import EditModal from "./EditModal";
import { ExternalLink, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";

export default function ProjectList({ projects, refresh }) {
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      setDeleting(id);
      await api.delete(`/projects/${id}`);
      toast.success("Deleted 🗑");
      refresh();
    } catch (err) {
      toast.error("Delete failed ❌");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="mt-6">
      {projects.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No Projects Yet</p>
          <p className="text-sm mt-1">Start by adding your first project 🚀</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="
                group relative overflow-hidden
                rounded-2xl p-5
                bg-gradient-to-br from-white/5 to-white/0
                border border-white/10
                hover:border-blue-500/40
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-blue-500/5 blur-xl" />
              {/* Image */}
              {p.image && (
                <img
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `http://localhost:5000/uploads/${p.image}`
                  }
                  alt="project"
                  className="w-full h-40 object-cover rounded-lg mb-4 border border-white/10"
                />
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold">{p.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {p.description}
              </p>

              {/* Links */}
              <div className="flex gap-3 mt-4 text-sm">
                {p.githubLink && (
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-gray-300 hover:text-white"
                  >
                    <FaGithub size={14} />
                    Code
                  </a>
                )}

                {p.liveLink && (
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-green-400 hover:text-green-300"
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => setSelected(p)}
                  className="
                    flex items-center gap-1 text-blue-400 
                    hover:text-blue-300 transition
                  "
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(p._id)}
                  disabled={deleting === p._id}
                  className="
                    flex items-center gap-1 text-red-400 
                    hover:text-red-300 transition
                  "
                >
                  <Trash2 size={14} />
                  {deleting === p._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <EditModal
          project={selected}
          close={() => setSelected(null)}
          refresh={refresh}
        />
      )}
    </div>
  );
}
