import nodemailer from "nodemailer";

export const createTransporter = () => {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  console.log("EMAIL_USER:", user);
  console.log("EMAIL_PASS exists:", !!pass);

  if (!user || !pass) {
    throw new Error("Email credentials missing ❌");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // ✅ explicit host
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
    pool: true,

    // 🔥 FORCE IPv4 at socket level
    family: 4, // 🔥 FORCE IPv4 (VERY IMPORTANT)
  });

  return transporter;
};
