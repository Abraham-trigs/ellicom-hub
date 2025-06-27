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
📄 File: firebaseRoleUtils.js

🧠 Purpose:
- Provides frontend utility for securely assigning custom Firebase roles
  through a callable Cloud Function (`setCustomClaims`).

🛡️ Access Control:
- Server-side function ensures only SuperAdmins can assign roles.

📦 Usage:
- import { assignCustomRole } from '../utils/firebaseRoleUtils';
- Used typically in SuperAdmin panels when creating/editing users.

❗ Reminder:
- Make sure the Firestore path casing matches: 'superadmins', 'staff', etc.
- This sets the Auth claim — Firestore must still hold matching role documents.
*/
