import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function AnimatedCursor() {
  const { theme } = useTheme();

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  let mouse = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };

  /* 🔥 TRACK MOUSE */
  useEffect(() => {
    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* 🔥 HOVER EFFECT */
  useEffect(() => {
    const hoverIn = () => {
      if (ringRef.current) {
        ringRef.current.style.transform += " scale(1.5)";
        ringRef.current.style.opacity = "1";
      }
    };

    const hoverOut = () => {
      if (ringRef.current) {
        ringRef.current.style.opacity = "0.5";
      }
    };

    const elements = document.querySelectorAll("a, button");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", hoverIn);
      el.addEventListener("mouseleave", hoverOut);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", hoverIn);
        el.removeEventListener("mouseleave", hoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* 🔥 DOT */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`rounded-full transition-all duration-150
          ${
            theme === "light"
              ? "w-[5px] h-[5px] bg-blue-500"
              : "w-[6px] h-[6px] bg-pink-400"
          }`}
        />
      </div>

      {/* 🔥 RING */}
      {theme !== "light" && (
        <div
          ref={ringRef}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="w-7 h-7 rounded-full border border-blue-500 opacity-50 transition-all duration-200" />
        </div>
      )}
    </>
  );
}
