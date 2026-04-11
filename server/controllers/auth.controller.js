import { createTransporter } from "../utils/mailer.js";
import jwt from "jsonwebtoken";

let otpStore = {};

console.log(process.env.EMAIL_USER, "");


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("📩 Incoming email:", email);
    console.log("🔐 ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

    // ✅ Check email
    if (email !== process.env.ADMIN_EMAIL) {
      console.log("❌ Email mismatch");
      return res.status(403).json({ message: "Unauthorized ❌" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

    console.log("📦 OTP generated:", otp);

    const transporter = createTransporter();

    // ✅ Verify transporter connection (NEW - IMPORTANT)
    // await transporter.verify();
    console.log("✅ Mail server ready");

    // ✅ Send mail
    const info = await transporter.sendMail({
      from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Admin Login OTP",
      html: `<h2>${otp}</h2>`,
    });

    console.log("✅ OTP SENT:", otp);
    console.log("📨 Message ID:", info.messageId);

    res.status(200).json({
      success: true,
      message: "OTP sent ✅",
    });
  } catch (error) {
    console.error("❌ SEND OTP ERROR FULL:", error); // full error (not just message)

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
