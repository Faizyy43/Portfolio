import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../api/api";
import toast from "react-hot-toast";
import { useTheme } from "../../../context/ThemeContext";

/* ================= DROPDOWN ================= */
function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full p-3 rounded-lg flex justify-between items-center transition-all duration-300
        ${
          isLight
            ? "bg-white border border-gray-300 hover:border-blue-500"
            : "bg-gray-900 border border-gray-700 hover:border-blue-400"
        }`}
      >
        <span className={value ? "" : "opacity-50"}>{value || label}</span>
        <span className="opacity-50">⌄</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute w-full mt-2 rounded-lg overflow-hidden shadow-xl z-50
            ${
              isLight
                ? "bg-white border border-gray-300"
                : "bg-gray-900 border border-gray-700 backdrop-blur-xl"
            }`}
          >
            {options.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer transition
                ${isLight ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= MAIN ================= */

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: "",
    projectType: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Required";
    if (!form.email) err.email = "Required";
    return err;
  };

  const submit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return toast.error("Please fill required fields");
    }

    try {
      setLoading(true);

      // ✅ FIX: define data properly
      const data = { ...form };

      try {
        await api.post("/contact", data);
      } catch (err) {
        // 🔥 retry for Render wake-up
        await new Promise((res) => setTimeout(res, 2000));
        await api.post("/contact", data);
      }

      toast.success("Submitted successfully");

      setForm({
        name: "",
        email: "",
        message: "",
        budget: "",
        timeline: "",
        projectType: "",
      });
    } catch {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-20 mt-5 relative overflow-hidden
      ${isLight ? "bg-white" : "bg-black"}`}
    >
      {/* 🌌 BACKGROUND */}
      {!isLight && (
        <>
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:30px_30px]" />
          </div>
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[140px]" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-2xl rounded-2xl p-8 md:p-10 transition-all
        ${
          isLight
            ? "bg-white border border-gray-300 shadow-lg"
            : "bg-gray-900 border border-gray-700 backdrop-blur-xl shadow-xl"
        }`}
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Start a Project
          </h2>
          <p className="text-sm opacity-60 mt-2">
            Share your requirements. I’ll get back quickly.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {["name", "email"].map((field, i) => (
            <input
              key={i}
              placeholder={field === "name" ? "Full Name" : "Email Address"}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className={`w-full p-3 rounded-lg outline-none transition-all
              ${
                isLight
                  ? "border border-gray-300 focus:border-blue-500"
                  : "bg-black border border-gray-700 focus:border-blue-400"
              }`}
            />
          ))}

          <div className="grid md:grid-cols-3 gap-4">
            <Dropdown
              label="Project Type"
              value={form.projectType}
              onChange={(val) => setForm({ ...form, projectType: val })}
              options={["Website", "Web App", "Dashboard"]}
            />
            <Dropdown
              label="Budget"
              value={form.budget}
              onChange={(val) => setForm({ ...form, budget: val })}
              options={["₹5K–₹10K", "₹10K–₹25K", "₹25K+"]}
            />
            <Dropdown
              label="Timeline"
              value={form.timeline}
              onChange={(val) => setForm({ ...form, timeline: val })}
              options={["1 Week", "2–4 Weeks", "1–2 Months"]}
            />
          </div>

          <textarea
            rows={5}
            placeholder="Project Description"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`w-full p-3 rounded-lg outline-none
            ${
              isLight
                ? "border border-gray-300 focus:border-blue-500"
                : "bg-black border border-gray-700 focus:border-blue-400"
            }`}
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition-all
            ${
              isLight
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gradient-to-r from-blue-500 to-pink-500 text-white"
            }`}
          >
            {loading ? "Processing..." : "Submit Request →"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
