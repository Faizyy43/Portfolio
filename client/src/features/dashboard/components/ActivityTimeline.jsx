import { useMemo } from "react";
import { Circle } from "lucide-react";

export default function ActivityTimeline({ projects = [] }) {
  const activities = useMemo(() => {
    let items = [];

    projects.forEach((p) => {
      // Project created
      if (p.createdAt) {
        items.push({
          text: `Project "${p.title}" created`,
          date: new Date(p.createdAt),
        });
      }

      // Payment
      if (p.budget) {
        items.push({
          text: `Payment received ₹${p.budget}`,
          date: new Date(p.updatedAt || p.createdAt),
        });
      }

      // Reviews
      if (p.reviews?.length) {
        items.push({
          text: `${p.reviews.length} review(s) added`,
          date: new Date(p.updatedAt || p.createdAt),
        });
      }
    });

    return items.sort((a, b) => b.date - a.date).slice(0, 5);
  }, [projects]);

  const formatTimeAgo = (date) => {
    const diff = Math.floor((new Date() - date) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

    return `${Math.floor(diff / 86400)} day ago`;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold mb-4">Activity</h3>

      {activities.length === 0 ? (
        <p className="text-gray-400 text-sm">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Circle size={10} className="text-blue-400 mt-1" />

              <div>
                <p className="text-sm text-gray-200">{item.text}</p>

                <span className="text-xs text-gray-500">
                  {formatTimeAgo(item.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
