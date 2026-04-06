import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";
import { CheckCircle, Trash2, Star } from "lucide-react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reviews/all");
      setReviews(res.data || []);
    } catch (err) {
      toast.error("Failed to load reviews ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const approve = async (id) => {
    try {
      setActionLoading(id);
      await api.put(`/reviews/${id}/approve`);
      toast.success("Approved ✅");
      fetchReviews();
    } catch {
      toast.error("Error approving ❌");
    } finally {
      setActionLoading(null);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      setActionLoading(id);
      await api.delete(`/reviews/${id}`);
      toast.success("Deleted 🗑");
      fetchReviews();
    } catch {
      toast.error("Delete failed ❌");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      {/* <h2 className="text-2xl font-semibold mb-6">Review Management</h2> */}

      {/* Loading */}
      {loading && <div className="text-gray-400">Loading reviews...</div>}

      {/* Empty */}
      {!loading && reviews.length === 0 && (
        <div className="text-center text-gray-400 py-12">No reviews yet ✨</div>
      )}

      {/* List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="
              group relative overflow-hidden
              p-5 rounded-2xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              hover:border-blue-500/40
              transition-all duration-300
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-blue-500/5 blur-xl transition" />

            <div className="relative z-10 flex justify-between gap-4">
              {/* Left */}
              <div>
                <p className="font-semibold text-lg">{r.name}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1 text-yellow-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-sm text-gray-400 mt-2">{r.message}</p>

                {/* Status */}
                <span
                  className={`
                    inline-block mt-2 text-xs px-2 py-1 rounded-full
                    ${
                      r.approved
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}
                >
                  {r.approved ? "Approved" : "Pending"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 items-end">
                {!r.approved && (
                  <button
                    onClick={() => approve(r._id)}
                    disabled={actionLoading === r._id}
                    className="
                      flex items-center gap-1 px-3 py-1.5 rounded-lg
                      bg-green-500/20 text-green-400
                      hover:bg-green-500/30 transition
                    "
                  >
                    <CheckCircle size={14} />
                    {actionLoading === r._id ? "Approving..." : "Approve"}
                  </button>
                )}

                <button
                  onClick={() => remove(r._id)}
                  disabled={actionLoading === r._id}
                  className="
                    flex items-center gap-1 px-3 py-1.5 rounded-lg
                    bg-red-500/20 text-red-400
                    hover:bg-red-500/30 transition
                  "
                >
                  <Trash2 size={14} />
                  {actionLoading === r._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
