import Contact from "../models/Contact.js";
import { createTransporter } from "../utils/mailer.js";

export const submitContact = async (req, res) => {
  try {
    const data = {
      ...req.body,
      file: req.file ? req.file.filename : null,
    };

    const newContact = await Contact.create(data);

    const transporter = createTransporter();

    // 🔥 SEND EMAIL IN BACKGROUND (IMPORTANT FIX)
    (async () => {
      try {
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

        await transporter.sendMail({
          from: `"Faizan" <${process.env.EMAIL_USER}>`,
          to: data.email,
          subject: "We received your inquiry",
          html: `
            <p>Hello ${data.name},</p>
            <p>Your request has been received.</p>
            <p>Regards,<br/>Faizan</p>
          `,
        });

        console.log("✅ Emails sent");
      } catch (emailError) {
        console.log("❌ Email error:", emailError.message);
      }
    })();

    // ✅ RETURN RESPONSE IMMEDIATELY (IMPORTANT)
    res.status(200).json({ success: true });
  } catch (err) {
    console.log("❌ Server error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.log("❌ Fetch contacts error:", error.message);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const getNotification = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newLead = { name, email, message };

    // 🔥 EMIT TO ADMIN (no change)
    const io = req.app.get("io");
    io.emit("new_lead", newLead);

    res.status(200).json({ success: true });
  } catch (err) {
    console.log("❌ Notification error:", err.message);

    res.status(500).json({ error: "Server error" });
  }
};

// ✅ UPDATE STATUS
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
