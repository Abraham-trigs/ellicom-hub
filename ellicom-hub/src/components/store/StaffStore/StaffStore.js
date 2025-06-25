// stores/useStaffStore.js
import { create } from 'zustand';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/firebaseConfig'; // 🔁 adjust path as needed
import { toast } from 'react-toastify';

export const useStaffStore = create((set) => ({
  loading: false,
  staffList: [],

  // 🔐 Create Staff or Admin (trigger Cloud Function)
  createStaff: async (formData) => {
    set({ loading: true });
    try {
      const createStaffFn = httpsCallable(functions, 'createStaffAccount');
      const response = await createStaffFn(formData);
      const staffID = response?.data?.staffID;

      toast.success(`✅ Staff created with ID: ${staffID}`);
      return staffID;
    } catch (error) {
      console.error('❌ createStaff error:', error);
      toast.error(`Failed to create staff: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  // 🔁 Future feature: Fetch all staff from Firestore
  fetchStaffList: async () => {
    // placeholder logic — you’ll plug in Firestore call here
    console.log("fetchStaffList to be implemented...");
  },

  // 🗑 Future feature: Remove staff account
  deleteStaff: async (uid) => {
    console.log("deleteStaff coming soon...");
  },
}));
export default useStaffStore;


//
// useStaffStore.js – Zustand state management for staff/admin account handling
//
// Role: Manages staff-related operations across Ellicom-hub
//
// Core Features:
//   - loading: Tracks async status for UI feedback
//   - staffList: Placeholder array for future staff fetching
//
// Actions:
//   - createStaff(formData): 
//       Calls Firebase Cloud Function (`createStaffAccount`) to:
//         • Generate temp password + unique staffID
//         • Create Firebase Auth user
//         • Write staff record to Firestore
//         • Email login credentials to user via Nodemailer (backend)
//
//   - fetchStaffList(): 
//       Reserved for future Firestore integration to get all staff members
//
//   - deleteStaff(uid): 
//       Reserved for backend account deletion (coming in Phase 3/5)
//
// Notes:
//   - Uses react-toastify for feedback
//   - Keeps components clean by abstracting all logic into store
//   - Designed to scale with job assignment, password resets, etc.
//
