import { useState } from "react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const notifications = [
    "New client inquiry",
    "Project delivered",
    "Payment received ₹15K",
  ];

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        🔔
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-black border border-white/10 rounded-xl p-3">
          {notifications.map((n, i) => (
            <p key={i} className="text-sm text-gray-300 py-1">
              {n}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}