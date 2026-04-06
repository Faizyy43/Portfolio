import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import api from "../api/api";
import { Star, X, Check } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ReviewBot() {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const isAdmin = location.pathname.includes("dashboard");

  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const submit = async () => {
    if (!form.name || !form.message) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);
      await api.post("/reviews", form);

      setSuccess(true);

      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setForm({ name: "", message: "", rating: 5 });
      }, 1500);
    } catch {
      alert("Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 FLOAT BUTTON */}
      {!isAdmin && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setOpen(true)}
          className={`
fixed bottom-6 right-6 z-[999]
px-5 py-3 rounded-xl font-medium backdrop-blur-xl border transition-all

hover:scale-105 active:scale-95

${
  theme === "light"
    ? "bg-white/90 border-blue-300 shadow-lg shadow-blue-200/40 text-black"
    : "bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
}
`}
        >
          ✨
        </motion.button>
      )}

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {open && (
          <>
            {/* 🌫️ BLUR BACKGROUND */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
            />

            {/* 💎 CENTER PANEL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`
fixed inset-0 flex items-center justify-center z-[999] px-4
`}
            >
              <div
                className={`
w-full max-w-md p-6 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all

${
  theme === "light"
    ? "bg-white border-gray-300 shadow-blue-200/30"
    : "bg-gray-900 border-gray-700"
}
`}
              >
                {/* SUCCESS VIEW */}
                {success ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Check className="text-blue-500 mb-3" size={40} />
                    <p className="font-medium">Review Submitted</p>
                  </div>
                ) : (
                  <>
                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="font-semibold text-lg">Client Feedback</h3>
                      <X
                        size={18}
                        onClick={() => setOpen(false)}
                        className="cursor-pointer opacity-70 hover:opacity-100"
                      />
                    </div>

                    {/* NAME */}
                    <input
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={`
w-full p-3 rounded-lg mb-3 outline-none text-sm transition

focus:ring-2

${
  theme === "light"
    ? "border border-gray-300 focus:ring-blue-400"
    : "bg-black border border-gray-700 focus:ring-blue-500"
}
`}
                    />

                    {/* MESSAGE */}
                    <textarea
                      rows={3}
                      placeholder="Share your experience..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className={`
w-full p-3 rounded-lg mb-4 outline-none text-sm transition resize-none

focus:ring-2

${
  theme === "light"
    ? "border border-gray-300 focus:ring-blue-400"
    : "bg-black border border-gray-700 focus:ring-blue-500"
}
`}
                    />

                    {/* ⭐ RATING */}
                    <div className="flex gap-2 mb-5 justify-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={22}
                          onClick={() => setForm({ ...form, rating: i })}
                          className={`cursor-pointer transition-transform hover:scale-110
${i <= form.rating ? "text-pink-400" : "text-gray-400"}
`}
                        />
                      ))}
                    </div>

                    {/* SUBMIT */}
                    <button
                      disabled={loading}
                      onClick={submit}
                      className={`
w-full py-3 rounded-lg font-medium transition-all

${
  theme === "light"
    ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md shadow-blue-300/40"
    : "bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:opacity-90 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
}
${loading ? "opacity-70 cursor-not-allowed" : ""}
`}
                    >
                      {loading ? "Submitting..." : "Submit Review"}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
