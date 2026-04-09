import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";
import clsx from "clsx";

import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPostman,
  SiFigma,
  SiGit,
} from "react-icons/si";

export default function About() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const skills = [
    {
      title: "Frontend",
      items: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express", icon: SiExpress, color: "#888888" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      ],
    },
  ];

  const sections = [
    ["Frontend", "Modern UI systems with React"],
    ["Backend", "Scalable APIs with Node.js & Express"],
    ["Database", "Efficient MongoDB data modeling"],
    ["Deployment", "Production-ready system design"],
  ];

  return (
    <div
      className={clsx(
        "min-h-screen relative overflow-hidden",
        isLight ? "bg-white text-gray-900" : "bg-black text-white",
      )}
    >
      {/* DARK BG */}
      {!isLight && (
        <>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        </>
      )}

      <div className="relative max-w-6xl mx-auto px-6 md:px-16">
        {/* HERO */}
        <section className="pt-28 pb-16">
          <h1 className="text-4xl md:text-5xl font-semibold">About</h1>
          <p className="mt-6 text-lg opacity-60 max-w-xl">
            Full stack developer building scalable applications with clean,
            performance-focused architecture.
          </p>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-800" />

        {/* SYSTEM */}
        <section className="py-16 space-y-10">
          {sections.map(([title, desc], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-sm opacity-60 max-w-md text-right">{desc}</p>
            </motion.div>
          ))}
        </section>

        <div className="border-t border-gray-300 dark:border-gray-800" />

        {/* 🔥 TECH STACK */}
        <section>
          <h2 className="text-sm uppercase tracking-[0.3em] opacity-50 mb-10 pt-7">
            Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((group, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className={clsx(
                  "group p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden",

                  isLight
                    ? "bg-white border-gray-200 shadow-sm hover:shadow-xl"
                    : "bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10",
                )}
              >
                {/* 🔥 BACKGROUND HOVER */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/10" />
                </div>

                {/* TITLE */}
                <h3 className="text-xs uppercase tracking-[0.4em] opacity-40 mb-6 relative">
                  {group.title}
                </h3>

                {/* ITEMS */}
                <div className="flex flex-col gap-4 relative">
                  {group.items.map((item, idx) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm transition-all duration-300"
                      >
                        {/* ICON */}
                        <Icon
                          className="text-base transition-all duration-300 
                          text-gray-400 dark:text-gray-500
                          group-hover:text-[var(--color)]"
                          style={{ "--color": item.color }}
                        />

                        {/* TEXT */}
                        <span
                          className="transition-all duration-300 
                          text-gray-500 dark:text-gray-400
                          group-hover:text-[var(--color)]"
                          style={{ "--color": item.color }}
                        >
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* 🔥 BORDER EFFECT */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-pink-400/30 transition" />
              </motion.div>
            ))}
          </div>
        </section>

         <div className="mt-10 border-t border-gray-300 dark:border-gray-800" />

        {/* CTA */}
        <section className="pb-24 mt-5 flex justify-between items-center">
          <p className="text-sm opacity-60">Available for work</p>

          <Link
            to="/contact"
            className="px-6 py-2 text-sm rounded-md bg-pink-500 text-white hover:bg-pink-600 transition shadow-md hover:shadow-pink-500/30"
          >
            Contact
          </Link>
        </section>
      </div>
    </div>
  );
}
