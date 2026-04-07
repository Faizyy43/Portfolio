import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// temporary store (use Redis/DB in production)
let otpStore = {};

// 📩 SEND OTP CONTROLLER
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 🔐 allow only admin email
    if (email !== "faizansorthiya0@gmail.com") {
      return res.status(403).json({ message: "Unauthorized ❌" });
    }

    // 🔢 generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;

    // 📧 mail config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✉️ send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Admin Login OTP",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully ✅",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP ❌",
    });
  }
};

// ✅ VERIFY OTP CONTROLLER
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized ❌" });
    }

    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP expired ❌" });
    }

    if (otpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid OTP ❌" });
    }

    const accessToken = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "15m" }
    );

    delete otpStore[email];

    res.json({
      success: true,
      accessToken,
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "Server error ❌" });
  }
};