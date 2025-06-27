/**
 * Firebase Cloud Functions – Role Management + Logging
 * 🔐 SuperAdmin-only role assignment using custom claims
 */

import { onRequest, onCall } from 'firebase-functions/v2/https';
import logger from 'firebase-functions/logger';
import admin from 'firebase-admin';

// 🛠 Initialize Firebase Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp();
}

// 📣 Hello World – Simple test function (can be removed later)
export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

/**
 * 🔐 setCustomClaims – Callable only by authenticated SuperAdmins
 * 
 * Request: { uid: string, role: string }
 * 
 * Secure via:
 * ✅ Firebase Authentication (auth context check)
 * ✅ Role validation via Firestore
 */
export const setCustomClaims = onCall(async (request) => {
  const context = request.auth;
  const { uid, role } = request.data;

  // 🔒 1. User must be logged in
  if (!context) {
    throw new Error('User must be authenticated to perform this action.');
  }

  const callerUID = context.uid;

  // 🧠 2. Check role in Firestore: must be 'superadmin'
  const callerSnap = await admin.firestore().doc(`superadmins/${callerUID}`).get();

  if (!callerSnap.exists || callerSnap.data()?.role !== 'superadmin') {
    throw new Error('Only SuperAdmins can assign roles.');
  }

  // ⚠️ 3. Validate input
  if (!uid || !role) {
    throw new Error('Both "uid" and "role" are required.');
  }

  // ✅ 4. Set role claim
  await admin.auth().setCustomUserClaims(uid, { role });

  logger.info(`✅ Role "${role}" set by ${callerUID} for ${uid}`);
  return {
    message: `✅ Role '${role}' successfully set for user ${uid}.`,
  };
});

/*
📝 index.js Notes

✅ Uses Firebase Callable Functions via `onCall` to avoid CORS issues.
✅ Requires user to be logged in.
✅ Enforces SuperAdmin-only permission using Firestore role check.
✅ Sets custom user claims (used for route protection and UI gating).
*/
