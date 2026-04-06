import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Loader() {
  const { theme } = useTheme();

  const isLight = theme === "light";

  return (
    <div
      className={`
fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-500

${isLight ? "bg-white" : "bg-black"}
`}
    >
      {/* Glow background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
        className={`
absolute w-[300px] h-[300px] rounded-full blur-3xl

${isLight ? "bg-blue-400/40" : "bg-blue-500/20"}
`}
      />

      {/* Animated text */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-4"
      >
        {/* Logo Text */}
        <motion.h1
          animate={{
            textShadow: isLight
              ? "0px 0px 20px rgba(59,130,246,0.8)"
              : "0px 0px 20px rgba(59,130,246,0.8)",
          }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
          className={`
text-4xl md:text-5xl font-bold tracking-wide

${
  isLight
    ? "bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
    : "text-white"
}
`}
        >
          Faizan
        </motion.h1>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className={`
w-2 h-2 rounded-full

${isLight ? "bg-blue-500" : "bg-pink-400"}
`}
            />
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className={`
text-sm tracking-widest uppercase

${isLight ? "text-blue-600" : "text-gray-400"}
`}
        >
          Loading Experience
        </motion.p>
      </motion.div>
    </div>
  );
}
