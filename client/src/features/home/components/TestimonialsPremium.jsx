import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../api/api";
import { useTheme } from "../../../context/ThemeContext";

export default function TestimonialsPremium() {
  const { theme } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 50 });

  const intervalRef = useRef(null);

  // 🔥 FETCH
  useEffect(() => {
    api.get("/reviews").then((res) => setReviews(res.data));
  }, []);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    if (!reviews.length) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [reviews]);

  const review = reviews[index];

  // 🎯 3D + LIGHT EFFECT
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;

    setRotate({
      x: x * 8,
      y: y * -8,
    });

    setLight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const resetRotate = () => {
    setRotate({ x: 0, y: 0 });
    setLight({ x: 50, y: 50 });
  };

  return (
    <div className="mt-20 px-4 text-center">
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-10 tracking-tight">
        Client Experience
      </h2>

      {/* CARD */}
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetRotate}
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: 0,
                rotateX: rotate.x,
                rotateY: rotate.y,
              }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className={`
relative px-6 py-7 rounded-2xl backdrop-blur-xl border transition-all overflow-hidden

${
  theme === "light"
    ? "bg-white/80 border-yellow-200 shadow-[0_10px_40px_rgba(212,175,55,0.15)]"
    : "bg-white/5 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
}
`}
              style={{
                background:
                  theme === "light"
                    ? `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,215,0,0.15), transparent 40%)`
                    : `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(59,130,246,0.15), transparent 40%)`,
              }}
            >
              {/* ⭐ RATING */}
              <div className="text-yellow-400 text-sm mb-2">
                {review ? "★".repeat(review.rating) : "★★★★★"}
              </div>

              {/* 💬 MESSAGE */}
              <p
                className={`text-sm md:text-base leading-relaxed mb-4 font-light

${
  theme === "light" ? "text-gray-700" : "text-gray-300"
}
`}
              >
                {review
                  ? `"${review.message}"`
                  : `"Client feedback will appear here after approval."`}
              </p>

              {/* 👤 USER */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                  {review?.name?.charAt(0) || "U"}
                </div>

                <div className="text-left">
                  <h4 className="text-sm font-medium">
                    {review?.name || "Anonymous"}
                  </h4>
                  <p className="text-[11px] opacity-60">
                    Verified Client
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* DOTS */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full cursor-pointer transition-all

${
  i === index
    ? theme === "light"
      ? "bg-yellow-500 w-5"
      : "bg-blue-400 w-5"
    : "bg-gray-400/30 w-3"
}
`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}