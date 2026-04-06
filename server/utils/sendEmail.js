import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "faizansorthiya0@gmail.com",
      pass: "fsgrdjnroyicbkbx",
    },
  });

  await transporter.sendMail({
    from: "Portfolio",
    to: "faizansorthiya0@gmail.com",
    subject: "🔥 New Client Lead",
    html: `
      <h3>New Lead</h3>
      <p>Name: ${data.name}</p>
      <p>Email: ${data.email}</p>
      <p>Message: ${data.message}</p>
    `,
  });
};
