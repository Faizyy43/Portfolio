import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/projects", name: "Work" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
      <motion.nav
        onMouseMove={(e) =>
          setMouse({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
        }
        className={`relative w-full max-w-6xl rounded-2xl px-6 py-3 flex items-center justify-between overflow-hidden
        ${
          scrolled
            ? isLight
              ? "bg-white/90 backdrop-blur-xl border border-gray-300 shadow-lg"
              : "bg-black/70 backdrop-blur-xl border border-gray-700 shadow-xl"
            : "bg-transparent"
        }`}
      >
        {/* 🔥 SOFT CURSOR */}
        <motion.div
          className="pointer-events-none absolute w-40 h-40 bg-gradient-to-r from-blue-500/20 to-pink-500/20 blur-2xl rounded-full"
          animate={{
            x: mouse.x - 80,
            y: mouse.y - 80,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />

        {/* 🔥 LOGO */}
        <Link to="/" className="flex items-center gap-2 relative z-10 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition">
            FZ
          </div>

          <span className="font-semibold text-sm tracking-tight">
            Faizan<span className="opacity-50">.dev</span>
          </span>
        </Link>

        {/* 🔥 NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 relative z-10">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;

            return (
              <motion.div
                key={link.path}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={link.path}
                  className={`relative text-sm font-medium transition-all
                  ${
                    active
                      ? isLight
                        ? "text-gray-900"
                        : "text-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {link.name}

                  {/* 🔥 UNDERLINE */}
                  {active && (
                    <motion.span
                      layoutId="active-line"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-500 to-pink-500"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}

          {/* 🔥 THEME BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition
            ${
              isLight
                ? "bg-gray-100 hover:bg-gray-200"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
        </div>

        {/* 🔥 MOBILE */}
        <div className="flex items-center gap-3 md:hidden relative z-10">
          <button onClick={toggleTheme}>{isLight ? <Moon /> : <Sun />}</button>

          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* 🔥 MOBILE MENU */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        className="absolute top-20 w-[90%] max-w-md"
      >
        {open && (
          <div
            className={`rounded-xl p-5 flex flex-col gap-4
            ${
              isLight
                ? "bg-white shadow-xl border border-gray-300"
                : "bg-black border border-gray-700"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-sm font-medium opacity-80 hover:opacity-100"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
