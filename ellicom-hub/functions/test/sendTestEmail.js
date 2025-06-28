// functions/test/sendTestEmail.js

import 'dotenv/config';
import nodemailer from 'nodemailer';

// 📦 Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📬 Send test email
transporter.sendMail({
  from: `"Ellicom Test" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,  // send it to yourself
  subject: "✅ Nodemailer Works!",
  text: "If you're reading this, Nodemailer and your .env config are working 🎉",
}).then(() => {
  console.log("✅ Email sent successfully!");
}).catch(err => {
  console.error("❌ Failed to send email:", err);
});
