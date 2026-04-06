import Contact from "../models/Contact.js";
import { transporter } from "../config/mailer.js";

export const submitContact = async (req, res) => {
  try {
    const data = {
      ...req.body,
      file: req.file ? req.file.filename : null,
    };

    // ✅ Save to DB FIRST
    const newContact = await Contact.create(data);

    // ✅ SEND EMAIL
    try {
      // 🔥 Admin email (YOU receive)
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "New Project Inquiry",
        html: `
          <h3>New Inquiry</h3>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Project:</b> ${data.projectType}</p>
          <p><b>Budget:</b> ${data.budget}</p>
          <p><b>Timeline:</b> ${data.timeline}</p>
          <p><b>Message:</b> ${data.message}</p>
        `,
      });

      // 🔥 Auto reply to user
      await transporter.sendMail({
        from: `"Faizan" <${process.env.EMAIL_USER}>`, // ✅ REQUIRED
        to: data.email,
        subject: "We received your inquiry",
        html: `
          <p>Hello ${data.name},</p>
          <p>Your request has been received. I will respond shortly.</p>
          <br/>
          <p>Regards,<br/>Faizan</p>
        `,
      });

      console.log("✅ Emails sent successfully");
    } catch (emailError) {
      console.log("❌ Email failed FULL ERROR:", emailError);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log("❌ Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

export const getNotification = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newLead = { name, email, message };

    // 🔥 EMIT TO ADMIN
    const io = req.app.get("io");
    io.emit("new_lead", newLead);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};