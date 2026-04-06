import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ReviewSlider({ reviews = [], isLight }) {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = left, -1 = right

  // 🔥 DUPLICATE FOR LOOP
  const looped = [...reviews, ...reviews];

  // 🔥 AUTO REVERSE EVERY 12s
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => prev * -1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  if (!reviews.length) return null;

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-14 overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.3em] uppercase opacity-40">
          Testimonials
        </p>
        <h2 className="text-xl md:text-3xl font-semibold mt-2">
          What Clients Say
        </h2>
      </div>

      {/* 🔥 EDGE FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white dark:from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white dark:from-black to-transparent" />

      {/* SLIDER */}
      <motion.div
        className="flex gap-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: isHovered ? 40 : 20, // 🔥 slow on hover
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {looped.map((item, i) => (
          <div
            key={i}
            className={`min-w-[260px] md:min-w-[300px] flex-shrink-0 p-5 rounded-xl border transition-all duration-300

            ${
              isLight
                ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
                : "bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10"
            }

            hover:-translate-y-1`}
          >
            {/* ⭐ STARS */}
            <div className="flex gap-1 mb-3">
              {[...Array(item.rating || 5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                  ★
                </span>
              ))}
            </div>

            {/* 💬 TEXT */}
            <p className="text-sm opacity-80 leading-relaxed">
              “{item.message}”
            </p>

            {/* 👤 USER */}
            <div className="flex items-center gap-3 mt-5">
              <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                {item.name?.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs opacity-50">Client</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}