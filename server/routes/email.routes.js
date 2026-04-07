import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 🔥 DEBUG (optional but helpful)
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ✅ FIXED
        pass: process.env.EMAIL_PASS, // ✅ FIXED
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // ✅ FIXED
      subject: "New Client Message 🚀",
      html: `
        <h2>New Lead</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.log("EMAIL ERROR:", err); // ✅ DEBUG
    res.status(500).json(err.message);
  }
});

export default router;