/**
 * Firebase Cloud Functions – Role Management + Logging
 * 🔐 SuperAdmin-only role assignment using custom claims
 * 
 * Supported Triggers:
 * - onCall: secure callable from frontend
 * - onRequest: basic HTTP test endpoint
 */

import { onRequest, onCall } from 'firebase-functions/v2/https';
import logger from 'firebase-functions/logger';
import admin from 'firebase-admin';

// 🛠 Initialize Firebase Admin SDK (only once per cold start)
if (!admin.apps.length) {
  admin.initializeApp();
}

// 📣 Hello World – Simple test function
export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

/**
 * 🔐 setCustomClaims
 * Callable only by authenticated SuperAdmins
 * Sets a custom role claim (e.g. superadmin, admin, staff, client) on a target UID
 * 
 * Request shape: { uid: string, role: string }
 */
export const setCustomClaims = onCall(async (request) => {
  const context = request.auth;
  const { uid, role } = request.data;

  // 🧱 1. Auth check
  if (!context) {
    throw new Error('User must be authenticated to perform this action.');
  }

  const callerUID = context.uid;
  const callerSnap = await admin.firestore().doc(`staff/${callerUID}`).get();

  // 🔐 2. SuperAdmin permission check
  if (!callerSnap.exists || callerSnap.data()?.role !== 'superadmin') {
    throw new Error('Only SuperAdmins can assign roles.');
  }

  // ⚠️ 3. Input validation
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
