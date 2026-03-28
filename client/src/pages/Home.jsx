import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col justify-center items-center px-6">

      {/* NAME */}
      <h1 className="text-6xl font-bold tracking-wide">
        Faizan
      </h1>

      {/* ROLE */}
      <p className="mt-4 text-lg text-gray-400 text-center max-w-xl">
        Full Stack Developer specializing in React, Node.js, Express, and MongoDB.
        I build modern, scalable web applications.
      </p>

      {/* BUTTONS */}
      <div className="mt-8 flex gap-4">
        <Link
          to="/projects"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition"
        >
          View Projects
        </Link>

        <Link
          to="/contact"
          className="border border-gray-500 px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Contact Me
        </Link>
      </div>

    </div>
  );
}