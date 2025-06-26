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
  const randomDigits = Math.floor(100 + Math.random() * 900); // 3-digit random number
  const prefix = name.split(" ")[0]; // First word of name
  return `${prefix}${randomDigits}`;
}

// 📬 Configures nodemailer with environment-safe credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Set in .env
    pass: process.env.EMAIL_PASS, // App password from Gmail
  },
});

/**
 * 🔐 createStaffAccount
 * Creates a staff/admin account via callable function, only by a SuperAdmin
 * - Creates Firebase Auth user
 * - Saves user data to Firestore
 * - Emails credentials to new staff
 */
export const createStaffAccount = onCall(async (request) => {
  const { name, email, role } = request.data;
  const callerUid = request.auth?.uid;

  // 🔒 Ensure only authenticated users proceed
  if (!callerUid) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }

  // 🔐 Verify caller is a SuperAdmin
  const callerDoc = await db.collection("superadmins").doc(callerUid).get();
  if (!callerDoc.exists || callerDoc.data()?.role !== "superadmin") {
    throw new HttpsError(
      "permission-denied",
      "Only SuperAdmins can create staff/admin accounts."
    );
  }

  const password = generatePassword();
  const staffID = generateStaffID(name);

  try {
    // 👤 Create Firebase user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // 🗃️ Store in Firestore under staff collection
    await db.collection("staff").doc(userRecord.uid).set({
      id: staffID,
      name,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      canChangePassword: true,
    });

    // 📩 Email credentials to staff
    await transporter.sendMail({
      from: `"Ellicom Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your EllicomHub Staff Account",
      html: `
        <p>Hello ${name},</p>
        <p>Your staff account has been created. Use these credentials to log in:</p>
        <ul>
          <li><strong>Staff ID:</strong> ${staffID}</li>
          <li><strong>Temporary Password:</strong> ${password}</li>
        </ul>
        <p><strong>Note:</strong> Please change your password after your first login.</p>
        <p>— Ellicom Hub Team</p>
      `,
    });

    return { success: true, staffID };
  } catch (error) {
    logger.error("🔥 Error creating staff account:", error);
    throw new HttpsError("internal", error.message);
  }
});
