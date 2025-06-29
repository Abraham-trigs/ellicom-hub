/**
 * 🌐 Firebase Cloud Functions – Role Management + Logging
 * 🔐 SuperAdmin-only role assignment using custom claims
 * 📁 File: index.mjs
 */

import { onRequest, onCall, HttpsError } from 'firebase-functions/v2/https';
import logger from 'firebase-functions/logger';
import admin from 'firebase-admin';
import { createStaffAccount } from './createStaffAccount.mjs';

// 🛠️ Initialize Firebase Admin SDK (once)
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// 📣 helloWorld – Simple test route for sanity check
export const helloWorld = onRequest((req, res) => {
  logger.info('🔥 HelloWorld Function triggered!');
  res.send('👋 Hello from Firebase Functions!');
});

/**
 * 🔐 setCustomClaims – Assigns role to a user
 * Only callable by authenticated SuperAdmins.
 * 
 * @param {object} request.data - Contains uid and role
 * @param {object} request.auth - Firebase Auth context
 */
export const setCustomClaims = onCall(async (request) => {
  const { uid, role } = request.data;
  const context = request.auth;

  // 🔒 1. Must be authenticated
  if (!context?.uid) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  const callerUID = context.uid;

  // 🔐 2. Caller must be a SuperAdmin in the superadmins collection
  const callerDoc = await db.collection("superadmins").doc(callerUID).get();
  const isSuperAdmin = callerDoc.exists && callerDoc.data()?.role === 'superadmin';

  if (!isSuperAdmin) {
    throw new HttpsError('permission-denied', 'Only SuperAdmins can assign roles.');
  }

  // ⚠️ 3. Validate uid and role inputs
  if (!uid || !role) {
    throw new HttpsError('invalid-argument', 'Both "uid" and "role" are required.');
  }

  const normalizedRole = role.toLowerCase(); // 🧼 Normalize casing

  // ✅ 4. Apply custom claim
  await admin.auth().setCustomUserClaims(uid, { role: normalizedRole });

  // 🔄 5. Revoke refresh tokens so claim takes effect immediately
  await admin.auth().revokeRefreshTokens(uid);

  logger.info(`✅ ${callerUID} assigned role "${normalizedRole}" to UID: ${uid}`);

  return {
    message: `✅ Custom claim set: ${uid} → ${normalizedRole}`,
  };
});

// 🔁 Export staff creation function as well
export { createStaffAccount };



// 🧾 What the Code Does (Summary)
// Initializes Firebase Admin SDK and Firestore connection.

// Defines a simple helloWorld endpoint for test requests.

// Defines a secure callable setCustomClaims function:

// Requires authentication

// Checks if caller is listed in superadmins collection with role "superadmin"

// Assigns role to any user via custom claims in Firebase Auth

// Revokes token to ensure updated claims apply immediately

// Exports createStaffAccount from the external module
