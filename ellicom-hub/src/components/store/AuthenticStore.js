import { create } from 'zustand';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const useAuthenticStore = create((set, get) => ({
  user: null,
  role: null,
  loading: true,
  isAppReady: false,

  // 🔁 Real-time auth listener + role resolver
  fetchUser: async () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        set({ user: firebaseUser });

        try {
          await firebaseUser.getIdToken(true); // force refresh
          const tokenResult = await getIdTokenResult(firebaseUser);
          const customRole = tokenResult.claims.role;

          if (customRole) {
            set({ role: customRole });
          } else {
            const userRef = doc(db, 'staff', firebaseUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              set({ role: userSnap.data().role || null });
            } else {
              console.warn('⚠️ Role not found in Firestore.');
              set({ role: null });
            }
          }
        } catch (err) {
          console.error('🔥 Error retrieving user role:', err);
          set({ role: null });
        }
      } else {
        set({ user: null, role: null });
      }

      set({ loading: false, isAppReady: true });
    });
  },

  // 🧼 Logout helper
  logout: async () => {
    await auth.signOut();
    set({ user: null, role: null, loading: false });
  },

  // 💡 Utility functions (optional)
  isSuperAdmin: () => get().role === 'superadmin',
  isStaff: () => ['staff', 'admin'].includes(get().role),
  isGuest: () => !get().user && !get().role,
  hasRole: (rolesArray) => rolesArray.includes(get().role),
}));

export default useAuthenticStore;


// store/useAuthenticStore.js

//
// 🧠 AuthenticStore – Central auth + role store (used app-wide)
//
// Purpose:
//   - Tracks current Firebase user and their role (superadmin, staff, client, etc.)
//   - Listens to real-time auth state changes via onAuthStateChanged
//   - Retrieves role either from custom claims or Firestore fallback
//
// Core State:
//   - user: Firebase user object
//   - role: String (e.g. "superadmin", "staff")
//   - loading: Whether auth check is in progress
//   - isAppReady: Used to gate route rendering until auth is resolved
//
// Core Actions:
//   - fetchUser(): initializes user + role detection
//   - logout(): signs out and resets user state
//
// Utilities:
//   - isSuperAdmin(), isStaff(), isGuest(), hasRole() – helpful role-based checks
//
// Why Use Zustand Here?
//   - Centralized, reactive state for route guards, UI conditions, dashboards, etc.
//   - Easily accessed from anywhere in the app without prop drilling
//

