// 🌍 Load environment variables from .env
import 'dotenv/config';

import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v2/https';
import logger from 'firebase-functions/logger';
import admin from 'firebase-admin';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// 🔧 Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// 🔐 Generates a secure, random base64 password
function generatePassword(length = 10) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

// 🆔 Generates a unique Staff ID like "Abraham082"
function generateStaffID(name) {
  const randomDigits = Math.floor(100 + Math.random() * 900);
  const prefix = name.split(" ")[0];
  return `${prefix}${randomDigits}`;
}

// 📬 Nodemailer config (uses Gmail and env vars)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createStaffAccount = onCall(async (request) => {
  const { name, email, role, password: rawPassword, staffID: rawStaffID } = request.data;
  const callerUid = request.auth?.uid;

  // 🔐 Validate caller
  if (!callerUid) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }

  const callerDoc = await db.collection("superadmins").doc(callerUid).get();
  if (!callerDoc.exists || callerDoc.data()?.role !== "superadmin") {
    throw new HttpsError("permission-denied", "Only SuperAdmins can create staff/admin accounts.");
  }

  // 🧠 Use provided password/staffID or generate fresh ones
  const password = rawPassword || generatePassword();
  const staffID = rawStaffID || generateStaffID(name);

  try {
    // 👤 Create Firebase user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // 🧾 Optional: Set custom claims here if you want role-based access via claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role, staffID });

    // 🗃️ Save user data in Firestore
    await db.collection("staff").doc(userRecord.uid).set({
      id: staffID,
      name,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      canChangePassword: true,
    });

    // 📧 Email the new staff member
    await transporter.sendMail({
      from: `"Ellicom Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your EllicomHub Staff Account",
      html: `
        <p>Hello ${name},</p>
        <p>Your ${role.toUpperCase()} account has been created. Use the following credentials:</p>
        <ul>
          <li><strong>Staff ID:</strong> ${staffID}</li>
          <li><strong>Temporary Password:</strong> ${password}</li>
        </ul>
        <p><strong>Important:</strong> Please change your password upon first login.</p>
        <p>— Ellicom Hub Team</p>
      `,
    });

    logger.info(`✅ Created ${role} (${staffID}) for ${email}`);
    return { success: true, staffID };
  } catch (error) {
    logger.error("🔥 Error creating staff account:", error);
    throw new HttpsError("internal", error.message);
  }
});
