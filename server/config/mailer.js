import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER?.trim();
const pass = process.env.EMAIL_PASS?.trim();

console.log("EMAIL_USER:", user);
console.log("EMAIL_PASS exists:", !!pass);

// ❌ Stop server crash if missing
if (!user || !pass) {
  console.log("❌ Email credentials missing in ENV");
}

// ✅ SINGLE GLOBAL TRANSPORTER (FAST)
export const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true, // 🔥 performance boost
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user,
    pass,
  },
});

// ✅ Verify once
transporter.verify((err) => {
  if (err) {
    console.log("❌ MAIL ERROR:", err.message);
  } else {
    console.log("✅ MAIL SERVER READY");
  }
});
