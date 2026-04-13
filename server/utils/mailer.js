import { Resend } from "resend";

export const sendMail = async ({ to, subject, html, replyTo }) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("❌ RESEND_API_KEY missing in .env");
    }

    const resend = new Resend(apiKey);

    const response = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      subject,
      html,
      reply_to: replyTo || undefined,
    });

    console.log("✅ Resend Email sent:", response);

    return response;
  } catch (error) {
    console.error("❌ Resend Error:", error);
    throw error;
  }
};
