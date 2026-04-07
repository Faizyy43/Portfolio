import { useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 📩 SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/send-otp", { email });
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", { email, otp });

      console.log("RESPONSE:", res.data); // 🔥 add this

      localStorage.setItem("accessToken", res.data.accessToken);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* 🌌 GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      {/* 🔵 BLUE GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] top-[-100px] left-1/2 -translate-x-1/2" />

      {/* 💖 PINK GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] bottom-[-100px] right-1/3" />

      {/* 🔥 CARD */}
      <form
        onSubmit={step === 1 ? sendOtp : verifyOtp}
        className="relative w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 shadow-[0_0_60px_rgba(0,0,0,0.6)] animate-fadeIn"
      >
        {/* 🔐 TITLE */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Admin Access 🔐</h2>
          <p className="text-gray-400 text-sm mt-1">
            {step === 1
              ? "Enter your admin email"
              : "Enter OTP sent to your email"}
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex justify-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${step === 1 ? "bg-blue-500" : "bg-gray-600"}`}
          />
          <div
            className={`w-2 h-2 rounded-full ${step === 2 ? "bg-pink-500" : "bg-gray-600"}`}
          />
        </div>

        {/* EMAIL INPUT */}
        {step === 1 && (
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/60 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.4)] outline-none transition"
          />
        )}

        {/* OTP INPUT */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-black/60 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-pink-500 focus:shadow-[0_0_20px_rgba(236,72,153,0.4)] outline-none transition text-center tracking-[6px] text-lg"
              maxLength={6}
            />

            {/* 🔄 RESEND OTP */}
            <button
              type="button"
              onClick={sendOtp}
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Resend OTP
            </button>
          </>
        )}

        {/* BUTTON */}
        <button
          disabled={loading}
          className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-pink-500 py-3 rounded-xl font-medium text-white flex justify-center items-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-[0.98] transition"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}

          {loading ? "Processing..." : step === 1 ? "Send OTP" : "Verify OTP"}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center">
          Protected admin login • OTP secured
        </p>
      </form>
    </div>
  );
}
