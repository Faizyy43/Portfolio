import { Folder } from "lucide-react";

export default function RecentProjects({ projects }) {
  if (!projects.length) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
        <Folder className="mx-auto mb-3 text-gray-500" size={28} />
        <p className="text-gray-400 text-sm">No projects yet 🚀</p>
        <p className="text-xs text-gray-500 mt-1">
          Start by adding your first project
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        <span className="text-xs text-gray-400">{projects.length} total</span>
      </div>

      <div className="space-y-3">
        {projects.slice(0, 5).map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition group"
          >
            <div>
              <p className="font-medium group-hover:text-blue-400 transition">
                {p.title}
              </p>

              <span
                className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                  p.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {p.status || "Active"}
              </span>
            </div>

            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              {p.tech || "MERN"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
