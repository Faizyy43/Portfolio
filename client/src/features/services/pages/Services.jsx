import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div
      className="min-h-screen 
bg-black text-white 
dark:bg-black dark:text-white 
light:bg-white light:text-black px-6 py-24"
    >
      {/* 🔥 HERO */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Services I Offer</h1>
        <p className="text-gray-400 mt-4">
          I build modern, scalable, and high-performance web applications that
          help businesses grow.
        </p>
      </div>

      {/* 🔥 SERVICES */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Website Development",
            desc: "Responsive, fast, and modern websites tailored to your business.",
          },
          {
            title: "Full Stack Applications",
            desc: "Complete solutions using React, Node.js, and MongoDB.",
          },
          {
            title: "Admin Dashboard",
            desc: "Custom dashboards with analytics, control panels, and APIs.",
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/5 border-white/10
light:bg-white light:border-yellow-300/40 p-6 rounded-xl hover:scale-105"
          >
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 🔥 PROCESS */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold mb-10">My Process</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {["Discuss", "Plan", "Develop", "Deliver"].map((step, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl">
              <h4 className="font-semibold">{step}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 WHY CHOOSE ME */}
      <div className="mt-24 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Why Choose Me?</h2>

        <p className="text-gray-400">
          I focus on clean UI, performance, and real-world solutions that
          deliver results. My goal is to build products that not only look good
          but also perform efficiently.
        </p>
      </div>

      {/* 🔥 CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl mb-4">Let’s Build Your Project 🚀</h2>

        <Link
          to="/contact"
          className="bg-blue-500 px-8 py-3 rounded-lg hover:scale-105 shadow-lg"
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
}
