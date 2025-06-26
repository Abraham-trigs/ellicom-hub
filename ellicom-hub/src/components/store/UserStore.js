// 🔐 useLoginStore.login() triggers signInWithEmailAndPassword
// 🧠 It then calls useAuthenticStore.fetchUser()
// 🧬 fetchUser() listens to Firebase auth and resolves role
// 🔄 Both stores (AuthenticStore and UserStore) are synced
// 🚀 UI everywhere can just use useUserStore() for reactive user info

import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import useAuthenticStore from './AuthenticStore';

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
    const currentRole = useAuthenticStore.getState().role;

    let userRef = null;

    // 🔍 Match role to specific Firestore collections
    switch (currentRole) {
      case 'client':
        userRef = doc(db, 'clients', uid);
        break;
      case 'staff':
        userRef = doc(db, 'staff', uid);
        break;
      case 'admin':
        userRef = doc(db, 'admins', uid);
        break;
      case 'superadmin':
        userRef = doc(db, 'superadmins', uid);
        break;
      case 'guest':
        userRef = doc(db, 'guests', uid);
        break;
      default:
        console.warn('⚠️ Unknown role:', currentRole);
        return;
    }

    try {
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        set({ user: { ...currentUser, ...data }, role: data.role || currentRole });
      } else {
        console.warn(`⚠️ No document found for ${currentRole} at path: ${userRef.path}`);
        set({ user: currentUser, role: currentRole });
      }
    } catch (err) {
      console.error('🔥 Firestore fetch error:', err);
      set({ user: currentUser, role: currentRole });
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




