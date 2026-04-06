import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function Topbar({ setSidebarOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="
        sticky top-0 z-40
        flex items-center justify-between
        px-6 py-4
        border-b border-white/10
        bg-[#0b0f19]/80 backdrop-blur-xl
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => {
            setSidebarOpen((prev) => !prev);
            setMenuOpen((prev) => !prev);
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* CENTER (🔥 PROFESSIONAL TITLE) */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1
          className="
            text-lg md:text-xl font-semibold tracking-wide
            bg-gradient-to-r from-white to-gray-400
            bg-clip-text text-transparent
          "
        >
          Admin Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-lg
            hover:bg-white/10
            transition
          "
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-blue-400" />
          )}
        </button>
      </div>
    </div>
  );
}
