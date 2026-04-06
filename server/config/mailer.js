import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER?.trim();
const pass = process.env.EMAIL_PASS?.trim();

console.log("USER:", user);
console.log("PASS exists:", !!pass);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: "faizansorthiya0@gmail.com",
  pass: "fsgrdjnroyicbkbx",
},
});

transporter.verify((err, success) => {
  if (err) {
    console.log("❌ FULL ERROR:", err);
  } else {
    console.log("✅ MAIL READY");
  }
});
