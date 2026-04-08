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
    service: "gmail",
    pool: true,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
};
