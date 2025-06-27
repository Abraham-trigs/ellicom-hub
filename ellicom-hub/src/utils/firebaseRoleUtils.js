// src/utils/firebaseRoleUtils.js
// 🔐 Utility to assign custom roles via Cloud Function from frontend

import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../lib/firebase'; // 👈 ensure initialized Firebase app

// 🌍 Use the correct Firebase region where your functions are deployed
const functions = getFunctions(app, 'africa-south1');

/**
 * 🔧 assignCustomRole – Calls Firebase Callable to set user role
 * @param {string} uid - The UID of the user to update
 * @param {string} role - Role to assign (e.g., 'admin', 'staff', 'client')
 * @returns {Promise<string>} - Success message from backend or fallback error
 */
export const assignCustomRole = async (uid, role) => {
  try {
    const setRole = httpsCallable(functions, 'setCustomClaims');
    const result = await setRole({ uid, role });
    return result.data.message; // ✅ Backend success response
  } catch (error) {
    console.error('🚫 Role assignment failed:', error);
    return `❌ Role assignment failed: ${error.message || 'Unknown error'}`;
  }
};

/*
📄 File: firebaseRoleUtils.js

🧠 Purpose:
- Provides frontend utility for securely assigning Firebase Auth custom roles
  via a Callable Cloud Function (setCustomClaims) deployed to africa-south1.

🛡️ Role & Firestore Notes:
- SuperAdmin is expected in: 'superadmins' collection
- Admin is expected in: 'admins' collection
- Staff is expected in: 'staff' collection
- Your `initAuth()` or any Firestore fetch must account for this difference.

📦 Usage:
- import { assignCustomRole } from '../utils/firebaseRoleUtils';
- Used when SuperAdmin creates a staff/admin account from the dashboard.

❗Important:
- The Firebase region **must match** the deployment region to avoid CORS issues.
- Role is only set in Auth claims. Ensure Firestore documents reflect the same role for full access control.
*/
