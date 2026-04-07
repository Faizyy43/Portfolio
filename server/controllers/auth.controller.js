import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// temporary store (use Redis/DB in production)
let otpStore = {};

// 📩 SEND OTP CONTROLLER
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 🔐 allow only admin email (ENV BASED)
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized ❌" });
    }

    // 🔢 generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // ⏳ store OTP with expiry (5 min)
    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

    // 📧 mail config (STRONG VERSION)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ verify connection (important)
    await transporter.verify();

    // ✉️ send mail
    await transporter.sendMail({
      from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Admin Login OTP",
      html: `
        <h2>Your OTP Code</h2>
        <p style="font-size:20px;font-weight:bold">${otp}</p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });

    console.log("OTP SENT:", otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully ✅",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP ❌",
      error: error.message, // helpful debug
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

    const record = otpStore[email];

    if (!record) {
      return res.status(400).json({ message: "OTP expired ❌" });
    }

    // ⏳ check expiry
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
    console.error("VERIFY OTP ERROR:", error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};
