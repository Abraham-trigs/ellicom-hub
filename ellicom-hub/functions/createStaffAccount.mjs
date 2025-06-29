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

// 🎟️ Generate referral code from all initials like "ABDT1234"
function generateReferralCode(name) {
  if (!name) return 'USER0000';
  const initials = name
    .trim()
    .split(/\s+/)
    .map(word => word[0]?.toUpperCase())
    .join('');
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${initials}${randomDigits}`;
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

  if (!callerUid) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }

  const callerDoc = await db.collection("superadmins").doc(callerUid).get();
  if (!callerDoc.exists || callerDoc.data()?.role !== "superadmin") {
    throw new HttpsError("permission-denied", "Only SuperAdmins can create accounts.");
  }

  const password = rawPassword || generatePassword();
  const staffID = rawStaffID || generateStaffID(name);
  const referralCode = generateReferralCode(name);

  let collection = 'staff';
  if (role === 'admin') collection = 'admins';
  else if (role === 'client') collection = 'clients';

  let userRecord;

  try {
    // 👤 Create Firebase Auth user
    userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
  } catch (err) {
    logger.error("❌ Firebase Auth creation failed:", err);
    throw new HttpsError("internal", "Failed to create Firebase Auth user.");
  }

  try {
    // 🏷️ Assign custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role, staffID });
  } catch (err) {
    logger.error("❌ Setting custom claims failed:", err);
    throw new HttpsError("internal", "Failed to assign custom user claims.");
  }

  try {
    // 🧾 Save user profile in Firestore
    await db.collection(collection).doc(userRecord.uid).set({
      id: staffID,
      name,
      email,
      role,
      referralCode,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      canChangePassword: true,
    });
  } catch (err) {
    logger.error("❌ Firestore write failed:", err);
    throw new HttpsError("internal", "Failed to save user profile in Firestore.");
  }

  try {
    // 📧 Send account credentials to email
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
          <li><strong>Referral Code:</strong> ${referralCode}</li>
        </ul>
        <p>Please change your password on first login.</p>
        <p>— Ellicom Hub Team</p>
      `,
    });
  } catch (err) {
    logger.error("❌ Email sending failed:", err);
    throw new HttpsError("internal", "Account created, but failed to send email.");
  }

  logger.info(`✅ ${role} account (${staffID}) created for ${email}`);
  return { success: true, uid: userRecord.uid, staffID, referralCode };
});



// 🧾 What the Code Does (Summary)
// Initializes Firebase Admin SDK and sets up email transporter.

// Defines utility functions to generate secure password, staff ID, and referral code.

// Checks that the request is from an authenticated SuperAdmin.

// Creates a Firebase Auth user with the provided or generated credentials.

// Sets custom user claims for role and staff ID.

// Saves the user profile to the appropriate Firestore collection.

// Sends the new credentials to the user’s email.

// Handles errors in isolated try/catch blocks for clearer debugging and failure tracking.
