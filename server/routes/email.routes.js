import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // ✅ BASIC VALIDATION
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // ✅ DEBUG LOGS (SAFE)
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌",
    );

    // 🔥 STRONG TRANSPORTER (BETTER THAN service:gmail)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // ✅ important
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ VERIFY CONNECTION (VERY IMPORTANT)
    await transporter.verify();

    // 📩 SEND EMAIL
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Message from ${name}`,
      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h2>New Client Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background:#f5f5f5;padding:10px;border-radius:6px">
            ${message}
          </div>
        </div>
      `,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "Email failed to send",
      details: err.message, // helpful for debugging
    });
  }
});

export default router;
