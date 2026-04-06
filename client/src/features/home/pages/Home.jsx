import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import api from "../../../api/api"; // 🔥 ADD
import ReviewSlider from "../ReviewSlider";

/* 🔥 MOBILE CARD (UNCHANGED) */
function MobileCard({ cmd, isLight }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className={`relative rounded-xl overflow-hidden border
        ${
          isLight
            ? "bg-white border-gray-300 shadow-md"
            : "bg-black border-gray-700"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-500/20">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <p className="ml-auto text-[10px] opacity-40">system.log</p>
        </div>

        {/* TERMINAL */}
        <div
          className={`px-3 py-2 font-mono text-xs
          ${
            isLight ? "bg-gray-100 text-blue-600" : "bg-gray-900 text-blue-400"
          }`}
        >
          <p className="opacity-70">$ {cmd}</p>
          <p className="flex items-center gap-1 text-pink-400">
            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
            success
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-3 space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="opacity-50">Role</span>
            <span className="font-medium">MERN Dev</span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-50">Frontend</span>
            <span>React</span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-50">Backend</span>
            <span>Node</span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-50">Status</span>
            <span className="text-pink-500">Open</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [cmd, setCmd] = useState("");
  const [reviews, setReviews] = useState([]); // 🔥 NEW

  useEffect(() => {
    const text = "deploy --profile faizan --mode=production";
    let i = 0;

    const t = setInterval(() => {
      setCmd(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(t);
    }, 25);

    return () => clearInterval(t);
  }, []);

  // 🔥 FETCH REVIEWS
  useEffect(() => {
    api
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .catch(console.log);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden
      ${isLight ? "bg-white text-gray-900" : "bg-black text-white"}
    `}
    >
      {/* 🔥 HERO SECTION */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-0 min-h-screen flex items-center">
        {!isLight && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        )}

        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
              MERN Stack Developer
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                Faizan
              </span>
            </h1>

            <h2
              className={`text-base sm:text-lg ${isLight ? "text-gray-600" : "text-gray-400"}`}
            >
              <Typewriter
                words={[
                  "Building scalable MERN apps",
                  "Clean UI & architecture",
                  "Performance optimized apps",
                ]}
                loop
                cursor
              />
            </h2>

            <p className="text-sm opacity-60 max-w-md mx-auto lg:mx-0">
              I build scalable, high-performance web applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/projects"
                className={`px-5 py-3 rounded-md
              ${isLight ? "bg-blue-500 text-white" : "bg-blue-600 text-white"}`}
              >
                View Work
              </Link>

              <Link
                to="/contact"
                className={`px-5 py-3 rounded-md border
              ${isLight ? "border-gray-400" : "border-gray-600"}`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            {/* MOBILE */}
            <div className="lg:hidden w-full">
              <MobileCard cmd={cmd} isLight={isLight} />
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:block">
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.25}
                scale={1.03}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                transitionSpeed={2000}
                className="relative"
              >
                {/* BACK LAYERS */}
                <div
                  className={`absolute -top-6 -left-6 w-full h-full rounded-2xl
                ${isLight ? "bg-blue-100" : "bg-blue-500/10"}`}
                />

                <div
                  className={`absolute -bottom-6 -right-6 w-full h-full rounded-2xl
                ${isLight ? "bg-pink-100" : "bg-pink-500/10"}`}
                />

                {/* MAIN CARD */}
                <div
                  className={`relative rounded-2xl overflow-hidden border
                ${
                  isLight
                    ? "bg-white border-gray-300 shadow-[0_30px_90px_rgba(0,0,0,0.08)]"
                    : "bg-gray-900 border-gray-700 shadow-2xl"
                }`}
                >
                  {/* HEADER */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-500/20">
                    <span className="w-3 h-3 rounded-full bg-pink-500" />
                    <span className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="w-3 h-3 rounded-full bg-purple-500" />
                    <p className="ml-auto text-xs opacity-40">system.log</p>
                  </div>

                  {/* TERMINAL */}
                  <div
                    className={`px-5 py-4 font-mono text-sm
                  ${
                    isLight
                      ? "bg-gray-100 text-blue-600"
                      : "bg-black text-blue-400"
                  }`}
                  >
                    <p className="opacity-70">$ {cmd}</p>
                    <p className="flex items-center gap-2 text-pink-400">
                      <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                      success
                    </p>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-40">Role</p>
                        <p className="font-semibold">MERN Stack Developer</p>
                      </div>

                      <div>
                        <p className="text-xs opacity-40">Frontend</p>
                        <p className="font-semibold">React.js</p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-40">Backend</p>
                        <p className="font-semibold">Node.js / Express</p>
                      </div>

                      <div>
                        <p className="text-xs opacity-40">Database</p>
                        <p className="font-semibold">MongoDB</p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-40">Specialty</p>
                        <p className="font-semibold">Scalable Web Apps</p>
                      </div>

                      <div>
                        <p className="text-xs opacity-40">Status</p>
                        <p className="font-semibold text-pink-500">
                          Open to Work
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

                    <div className="flex justify-between text-xs opacity-50">
                      <span>REST APIs • Auth • Dashboards</span>
                      <span>Deployment Ready</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
      <ReviewSlider reviews={reviews} isLight={isLight} />
    </div>
  );
}
