// 🔐 useLoginStore.login() triggers signInWithEmailAndPassword

// 🧠 It then calls useAuthenticStore.fetchUser()

// 🧬 fetchUser() listens to Firebase auth and resolves role

// 🔄 Both stores (AuthenticStore and UserStore) are synced

// 🚀 UI everywhere can just use useUserStore() for reactive user info


import { create } from 'zustand';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import useUserStore from './UserStore'; // syncing point

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
        useUserStore.setState({ user: firebaseUser }); // sync

        try {
          await firebaseUser.getIdToken(true);
          const tokenResult = await getIdTokenResult(firebaseUser);
          const customRole = tokenResult.claims.role;

          let resolvedRole = null;

          if (customRole) {
            resolvedRole = customRole;
          } else {
            const userRef = doc(db, 'staff', firebaseUser.uid); // Change as needed
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              resolvedRole = userSnap.data().role || null;
            } else {
              console.warn('⚠️ Role not found in Firestore.');
            }
          }

          set({ role: resolvedRole });
          useUserStore.setState({ role: resolvedRole }); // sync

        } catch (err) {
          console.error('🔥 Error retrieving user role:', err);
          set({ role: null });
          useUserStore.setState({ role: null });
        }
      } else {
        set({ user: null, role: null });
        useUserStore.setState({ user: null, role: null }); // sync
      }

      set({ loading: false, isAppReady: true });
    });
  },

  logout: async () => {
    await auth.signOut();
    set({ user: null, role: null, loading: false });
    useUserStore.setState({ user: null, role: null }); // sync
  },

  // Utility role checks
  isSuperAdmin: () => get().role === 'superadmin',
  isStaff: () => ['staff', 'admin'].includes(get().role),
  isGuest: () => !get().user && !get().role,
  hasRole: (rolesArray) => rolesArray.includes(get().role),
}));

export default useAuthenticStore;



//
// 🧠 useAuthenticStore.js – Central Firebase Auth & Role Manager
//
// 🔍 Purpose:
//   - Listens for auth state changes via Firebase
//   - Determines user role via custom claims or Firestore fallback
//   - Shares `user`, `role`, and auth state across the app
//
// 🔁 Syncs With:
//   - ✅ useUserStore: keeps UI-reactive global user/role in sync
//
// 📦 Core State:
//   - user: Firebase user object
//   - role: String (e.g. "staff", "client", "superadmin")
//   - loading: true while checking
//   - isAppReady: true once app has determined auth state
//
// 🔧 Actions:
//   - fetchUser(): Called on app init and after login
//   - logout(): Signs out and resets state
//
// ⚙️ Utilities:
//   - isSuperAdmin(), isStaff(), isGuest(), hasRole([...])
//
