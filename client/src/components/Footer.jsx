import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const year = new Date().getFullYear();

  const socials = [
    {
      icon: FaGithub,
      link: "https://github.com/Faizyy43",
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/faizan-sorathiya-6147a6295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      icon: Mail,
      link: "mailto:faizansorthiya0@gmail.com",
    },
  ];

  return (
    <footer
      className={`relative w-full border-t overflow-hidden
      ${
        isLight
          ? "bg-white border-gray-300 text-gray-700"
          : "bg-black border-gray-700 text-gray-300"
      }`}
    >
      {/* 🌌 subtle animated grid (dark only) */}
      {!isLight && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:32px_32px] animate-[moveGrid_40s_linear_infinite]" />
        </div>
      )}

      {/* ⚡ TOP BEAM */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40" />
        <div className="absolute w-[25%] h-full bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-[beam_6s_linear_infinite]" />
      </div>

      {/* 🔥 CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT */}
        <Link className="font-semibold tracking-wide relative group text-sm md:text-base">
          Faizan
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300 opacity-60" />
        </Link>

        {/* CENTER */}
        <p className="text-xs opacity-60 hidden md:block">
          © {year} Full Stack Developer
        </p>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 md:gap-4">
          {socials.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-2 md:p-2.5 rounded-md transition
        ${isLight ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
              >
                <Icon size={16} />

                {/* glow effect */}
                <span className="absolute inset-0 rounded-md opacity-0 hover:opacity-100 transition shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* 🔥 KEYFRAMES */}
      <style>
        {`
        @keyframes beam {
          0% { left: -30%; }
          100% { left: 130%; }
        }

        @keyframes moveGrid {
          0% { background-position: 0 0; }
          100% { background-position: 300px 300px; }
        }
        `}
      </style>
    </footer>
  );
}
