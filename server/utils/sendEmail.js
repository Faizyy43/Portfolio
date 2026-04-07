import { transporter } from "./mailer.js";

export const sendEmail = async (data) => {
  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🔥 New Client Lead",
      html: `
        <h3>New Lead</h3>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Message: ${data.message}</p>
      `,
    });

    console.log("✅ Lead Email Sent");
  } catch (error) {
    console.log("❌ Lead Email Error:", error.message);
  }
};
