import Contact from "../models/Contact.js";
import { createTransporter } from "../utils/nodemailer.js";

export const submitContact = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      budget: req.body.budget,
      timeline: req.body.timeline,
      projectType: req.body.projectType,
      file: req.file ? req.file.filename : null,
    };

    console.log("📩 Incoming data:", data);

    await Contact.create(data);

    const transporter = createTransporter();

    // ✅ ADMIN EMAIL
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
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

    // ✅ CLIENT EMAIL
    await transporter.sendMail({
      from: `"Faizan" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "We received your inquiry",
      html: `
    <div style="font-family:sans-serif;padding:20px">
      <h2>✅ Inquiry Received</h2>
      <p>Hello ${data.name},</p>
      <p>Thanks for reaching out. I will contact you soon.</p>
      <br/>
      <p>Regards,<br/>Faizan</p>
    </div>
  `,
    });

    // await sendMail({
    //   to: process.env.EMAIL_USER,
    //   subject: "New Project Inquiry",
    //   html: `
    //     <h3>New Inquiry</h3>
    //     <p><b>Name:</b> ${data.name}</p>
    //     <p><b>Email:</b> ${data.email}</p>
    //     <p><b>Project:</b> ${data.projectType}</p>
    //     <p><b>Budget:</b> ${data.budget}</p>
    //     <p><b>Timeline:</b> ${data.timeline}</p>
    //     <p><b>Message:</b> ${data.message}</p>
    //   `,
    // });

    // await sendMail({
    //   to: data.email,
    //   subject: "We received your inquiry",
    //   html: `
    //     <p>Hello ${data.name},</p>
    //     <p>Your request has been received.</p>
    //     <p>Regards,<br/>Faizan</p>
    //   `,
    // });

    console.log("✅ Emails sent");

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Server error:", err);
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
