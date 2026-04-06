import { useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 relative overflow-hidden bg-black">
      {/* 🌌 SPACE GRID */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      {/* 🔵 BLUE GLOW */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[140px]" />

      {/* 💖 PINK GLOW */}
      <div className="absolute bottom-[-150px] right-1/3 w-[400px] h-[400px] bg-pink-500/10 blur-[120px]" />

      {/* 🔥 CARD */}
      <form
        onSubmit={login}
        autoComplete="off"
        className="relative w-full max-w-sm bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 flex flex-col gap-5 shadow-2xl animate-fadeIn"
      >
        {/* FAKE INPUTS */}
        <input type="text" name="fakeuser" style={{ display: "none" }} />
        <input type="password" name="fakepass" style={{ display: "none" }} />

        <h2 className="text-2xl font-semibold text-white text-center">
          Admin Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="bg-black text-white px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="bg-black text-white px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition"
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-pink-500 hover:opacity-90 transition py-3 rounded-lg font-medium text-white flex justify-center items-center shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* EXTRA */}
        <p className="text-xs text-gray-400 text-center">
          Secure Admin Access 🔐
        </p>
      </form>
    </div>
  );
}
