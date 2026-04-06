import {
  LayoutDashboard,
  Folder,
  Users,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar({
  active,
  setActive,
  sidebarOpen,
  setSidebarOpen,
}) {
  const menu = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "projects", name: "Projects", icon: Folder },
    { id: "clients", name: "Clients", icon: Users },
    { id: "reviews", name: "Reviews", icon: MessageSquare },
  ];

  const navigate = useNavigate();

  return (
    <div
      className={`w-64 fixed md:sticky top-0 left-0 z-50 h-screen
      bg-gradient-to-b from-[#050816] via-[#0b0f1a] to-black
      border-r border-white/10 flex flex-col justify-between
      backdrop-blur-xl
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0`}
    >
      {/* TOP */}
      <div className="p-6">
        {/* 💎 BRAND */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold flex items-center gap-2 mb-10 tracking-wide"
        >
          {/* <span className="text-yellow-400 text-2xl">⚡</span> */}
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Faizan
          </span>
        </motion.h2>

        {/* MENU */}
        <div className="space-y-2">
          {menu.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setActive(item.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-300 group
                ${
                  active === item.id
                    ? "bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {/* 🔥 ACTIVE BAR */}
                {active === item.id && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-blue-400 rounded-r shadow-[0_0_10px_#3b82f6]"
                  />
                )}

                {/* ICON */}
                <Icon
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                {/* TEXT */}
                <span className="tracking-wide">{item.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* LOGOUT */}
      <div className="p-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            localStorage.clear();
            navigate("/admin");
          }}
          className="w-full flex items-center justify-center gap-2
          bg-red-500/10 text-red-400 border border-red-500/20
          py-3 rounded-xl transition-all duration-300
          hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
        >
          <LogOut size={16} />
          Logout
        </motion.button>
      </div>
    </div>
  );
}
