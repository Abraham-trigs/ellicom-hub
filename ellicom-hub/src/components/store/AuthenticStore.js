// 🔐 useLoginStore.login() triggers signInWithEmailAndPassword

// 🧠 It then calls useAuthenticStore.fetchUser()

// 🧬 fetchUser() listens to Firebase auth and resolves role

// 🔄 Both stores (AuthenticStore and UserStore) are synced

// 🚀 UI everywhere can just use useUserStore() for reactive user info


// store/useAuthenticStore.js
import { create } from 'zustand';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const useAuthenticStore = create((set, get) => ({
  user: null,
  role: null,
  loading: true,
  isAppReady: false,

  fetchUser: async (loginType = '') => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        set({ user: firebaseUser });

        try {
          await firebaseUser.getIdToken(true);
          const tokenResult = await getIdTokenResult(firebaseUser);
          const customRole = tokenResult.claims.role;

          if (customRole) {
            set({ role: customRole });
          } else {
            let userRef;
            if (loginType === 'client') {
              userRef = doc(db, 'clients', firebaseUser.uid);
            } else {
              userRef = doc(db, 'staff', firebaseUser.uid);
            }

            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              set({ role: userSnap.data().role || null });
            } else {
              console.warn('⚠️ Role not found in expected collection.');
              set({ role: null });
            }
          }
        } catch (err) {
          console.error('🔥 Error resolving user role:', err);
          set({ role: null });
        }
      } else {
        set({ user: null, role: null });
      }

      set({ loading: false, isAppReady: true });
    });
  },

  logout: async () => {
    await auth.signOut();
    set({ user: null, role: null, loading: false });
  },

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
