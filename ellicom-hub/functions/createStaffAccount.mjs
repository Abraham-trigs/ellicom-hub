// 🌍 Load environment variables from .env
import 'dotenv/config';

import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v2/https';
import logger from 'firebase-functions/logger';
import admin from 'firebase-admin';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// 🛠️ Initialize Firebase Admin SDK safely
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// 🔐 Generate secure random password
function generatePassword(length = 10) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

// 🆔 Generate Staff ID like “Abraham082”
function generateStaffID(name) {
  const randomDigits = Math.floor(100 + Math.random() * 900);
  const prefix = name.split(" ")[0] || "User";
  return `${prefix}${randomDigits}`;
}

// 📬 Email setup with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * 🔧 createStaffAccount – SuperAdmin-only account creator
 * Handles Firebase Auth, Firestore profile, custom claims, and email delivery.
 */
export const createStaffAccount = onCall(async (request) => {
  const { name, email, role, password: rawPassword, staffID: rawStaffID } = request.data;
  const callerUid = request.auth?.uid;

  // 🔐 Must be logged in
  if (!callerUid) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }

  // 🔐 Must be a superadmin
  const callerDoc = await db.collection("superadmins").doc(callerUid).get();
  if (!callerDoc.exists || callerDoc.data()?.role !== "superadmin") {
    throw new HttpsError("permission-denied", "Only SuperAdmins can create accounts.");
  }

  // ⚙️ Use provided values or generate new ones
  const password = rawPassword || generatePassword();
  const staffID = rawStaffID || generateStaffID(name);

  // 📁 Determine Firestore collection
  let collection = 'staff'; // default fallback
  if (role === 'admin') collection = 'admins';
  else if (role === 'client') collection = 'clients';

  try {
    // 👤 Create Firebase user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // 🏷️ Assign custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role, staffID });

    // 🧾 Save profile in appropriate Firestore collection
    await db.collection(collection).doc(userRecord.uid).set({
      id: staffID,
      name,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      canChangePassword: true,
    });

    // 📧 Send credentials via email
    await transporter.sendMail({
      from: `"Ellicom Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your EllicomHub Account",
      html: `
        <p>Hello ${name},</p>
        <p>Your <strong>${role.toUpperCase()}</strong> account has been created.</p>
        <ul>
          <li><strong>Staff ID:</strong> ${staffID}</li>
          <li><strong>Temporary Password:</strong> ${password}</li>
        </ul>
        <p>Please change your password on first login.</p>
        <p>— Ellicom Hub Team</p>
      `,
    });

    logger.info(`✅ ${role} account (${staffID}) created for ${email}`);
    return { success: true, staffID };
  } catch (error) {
    logger.error("❌ Error during account creation:", error);
    throw new HttpsError("internal", error.message);
  }
});
