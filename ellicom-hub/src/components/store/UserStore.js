// 🔐 useLoginStore.login() triggers signInWithEmailAndPassword
// 🧠 It then calls useAuthenticStore.fetchUser()
// 🧬 fetchUser() listens to Firebase auth and resolves role
// 🔄 Both stores (AuthenticStore and UserStore) are synced
// 🚀 UI everywhere can just use useUserStore() for reactive user info

import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const useUserStore = create((set) => ({
  user: null,
  role: null,

  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),

  resetUser: () => set({ user: null, role: null }),

  /**
   * 🧠 fetchUserAndRole – Fetch additional user data from Firestore
   * Called after login or app init to sync profile data (like displayName)
   */
  fetchUserAndRole: async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const { uid } = currentUser;
    let userRef;

    // Try both collections (adjust this logic if you split clients/staff/admin)
    const clientRef = doc(db, 'clients', uid);
    const staffRef = doc(db, 'staff', uid);

    const clientSnap = await getDoc(clientRef);
    const staffSnap = await getDoc(staffRef);

    if (clientSnap.exists()) {
      const data = clientSnap.data();
      set({ user: { ...currentUser, ...data }, role: data.role });
    } else if (staffSnap.exists()) {
      const data = staffSnap.data();
      set({ user: { ...currentUser, ...data }, role: data.role });
    } else {
      console.warn('⚠️ No user data found in Firestore for UID:', uid);
    }
  },
}));

export default useUserStore;


//
// 📦 useUserStore.js – Lightweight Reactive Store for UI
//
// 🔍 Purpose:
//   - Holds `user` and `role` for global UI access (without constant re-fetching)
//   - Used in navbars, dashboards, layouts, and conditional UI rendering
//
// 🧠 Fed by:
//   - ✅ useAuthenticStore (on app init & auth state changes)
//   - ✅ useLoginStore (after login success)
//   - ✅ fetchUserAndRole(): Pulls extra Firestore profile data after login
//
// 📦 State:
//   - user: Firebase user (extended with Firestore data like displayName, etc.)
//   - role: One of 'staff', 'client', 'admin', 'superadmin', etc.
//
// 🔧 Actions:
//   - setUser(user): Set the user object
//   - setRole(role): Set the role string
//   - resetUser(): Clears both user and role (on logout)
//   - fetchUserAndRole(): Loads user profile data from Firestore and sets it
//




