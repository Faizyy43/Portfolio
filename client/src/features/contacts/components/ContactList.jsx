import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";
import { Mail, User, CheckCircle, Clock } from "lucide-react";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact");
      setContacts(res.data || []);
    } catch (err) {
      toast.error("Failed to load contacts ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setActionLoading(id);
      await api.put(`/contact/${id}`, { status });
      toast.success("Status updated ✅");
      fetchContacts();
    } catch {
      toast.error("Update failed ❌");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-0">
      {/* Loading */}
      {loading && (
        <p className="text-gray-400 text-center py-10">Loading leads...</p>
      )}

      {/* Empty */}
      {!loading && contacts.length === 0 && (
        <div className="text-center text-gray-400 py-10">No leads found 🚀</div>
      )}

      {/* List */}
      <div className="space-y-4">
        {contacts.map((c) => (
          <div
            key={c._id}
            className="
              group relative overflow-hidden
              p-4 sm:p-5 rounded-xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              hover:border-blue-500/40
              transition-all duration-300
              backdrop-blur-xl
              shadow-md
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-blue-500/5 blur-xl transition" />

            {/* MAIN CONTAINER */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between gap-4">
              {/* LEFT */}
              <div className="space-y-1 w-full">
                <p className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <User size={14} />
                  {c.name}
                </p>

                <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 break-all">
                  <Mail size={14} />
                  {c.email}
                </p>

                {/* Message */}
                {c.message && (
                  <p className="text-xs sm:text-sm text-gray-300 mt-2 line-clamp-2">
                    {c.message}
                  </p>
                )}

                {/* Date */}
                {c.createdAt && (
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                )}

                {/* Status Badge */}
                <span
                  className={`
                    inline-block mt-2 text-[10px] sm:text-xs px-2 py-1 rounded-full
                    ${
                      c.status === "closed"
                        ? "bg-green-500/20 text-green-400"
                        : c.status === "contacted"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }
                  `}
                >
                  {c.status || "new"}
                </span>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex sm:flex-col gap-2 sm:items-end justify-end">
                <button
                  onClick={() => updateStatus(c._id, "contacted")}
                  disabled={actionLoading === c._id}
                  className="
                    flex items-center gap-1 px-3 py-1 rounded-lg
                    bg-yellow-500/20 text-yellow-400
                    hover:bg-yellow-500/30 transition
                    text-[10px] sm:text-xs
                  "
                >
                  <Clock size={14} />
                  {actionLoading === c._id ? "Updating..." : "Contacted"}
                </button>

                <button
                  onClick={() => updateStatus(c._id, "closed")}
                  disabled={actionLoading === c._id}
                  className="
                    flex items-center gap-1 px-3 py-1 rounded-lg
                    bg-green-500/20 text-green-400
                    hover:bg-green-500/30 transition
                    text-[10px] sm:text-xs
                  "
                >
                  <CheckCircle size={14} />
                  Close
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
