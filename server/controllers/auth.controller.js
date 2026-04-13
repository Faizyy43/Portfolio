import { log } from "console";
import { sendMail } from "../utils/mailer.js";
import jwt from "jsonwebtoken";

let otpStore = {};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized ❌" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

    await sendMail({
      to: process.env.EMAIL_USER, // 🔥 force your own email
      subject: "🔐 Admin Login OTP",
      html: `<h2>${otp}</h2>`,
    });

    console.log("✅ OTP SENT:", otp);

    res.status(200).json({
      success: true,
      message: "OTP sent ✅",
    });
  } catch (error) {
    console.error("❌ SEND OTP ERROR:", error);

    res.status(500).json({
      message: "Failed to send OTP ❌",
      error: error.message,
    });
  }
};

// ✅ VERIFY OTP (same logic, just clean logs)
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized ❌" });
    }

    const record = otpStore[email];

    if (!record) {
      return res.status(400).json({ message: "OTP expired ❌" });
    }

    if (Date.now() > record.expires) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired ❌" });
    }

    if (record.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP ❌" });
    }

    const accessToken = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "15m" },
    );

    delete otpStore[email];

    res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error("❌ VERIFY OTP ERROR:", error.message);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};
