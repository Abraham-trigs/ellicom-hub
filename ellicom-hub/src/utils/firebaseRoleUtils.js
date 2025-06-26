// src/utils/firebaseRoleUtils.js
// 🔐 Utility to assign custom roles via Cloud Function from frontend

import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../lib/firebase'; // 👈 ensure you’re importing initialized Firebase app

const functions = getFunctions(app);

/**
 * 🔧 assignCustomRole – Calls Firebase Callable to set user role
 * @param {string} uid - The UID of the user to update
 * @param {string} role - Role to assign (e.g., 'admin', 'staff', 'client')
 * @returns {Promise<string>} - Success message from backend
 */
export const assignCustomRole = async (uid, role) => {
  const setRole = httpsCallable(functions, 'setCustomClaims');
  const result = await setRole({ uid, role });
  return result.data.message; // ✅ Response from cloud function
};


/*
📝 firebaseRoleUtils.js Summary

✅ Provides a utility function to securely assign custom roles via Firebase Callable Cloud Function.
✅ Ensures only SuperAdmins (validated server-side) can set roles.
✅ Used in SuperAdmin workflows, e.g., when creating or editing staff.

Imported via: import { assignCustomRole } from '../utils/firebaseRoleUtils'
*/
