// src/utils/setUserRole.js
// 🔧 setUserRole – Call Firebase Callable Function to set a custom claim (role) on a user

import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase'; // ✅ make sure 'functions' is exported from your firebase.js

/**
 * setUserRole – Sets a Firebase custom claim (role) via Cloud Function
 * @param {string} uid - Firebase UID of the target user
 * @param {string} role - Role to assign ('superadmin', 'admin', 'staff', 'client')
 * @returns {Promise<object>} - Result or error from Cloud Function
 */
export const setUserRole = async (uid, role) => {
  try {
    const setRole = httpsCallable(functions, 'setUserRole');
    const result = await setRole({ uid, role });
    return result.data;
  } catch (error) {
    console.error('🚨 setUserRole failed:', error.message);
    throw error;
  }
};
