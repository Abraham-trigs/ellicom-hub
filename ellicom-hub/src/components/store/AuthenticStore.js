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
  user: null, // Firebase auth user
  role: null, // User role: 'client', 'staff', 'admin', 'superadmin'
  profile: null, // 📌 User metadata: email, uid, name, photo, etc.
  loading: true,
  isAppReady: false,

  // 🔍 Resolves Firebase user + role from custom claims or fallback to Firestore
  fetchUser: async (loginType = '') => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // 🔁 Set basic Firebase auth user object
        set({ user: firebaseUser });

        // 📌 Extract core user profile metadata
        const userProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'Anonymous',
          photoURL: firebaseUser.photoURL || '',
        };
        set({ profile: userProfile });

        try {
          // 🔐 Force token refresh to pull updated custom claims
          await firebaseUser.getIdToken(true);
          const tokenResult = await getIdTokenResult(firebaseUser);
          const customRole = tokenResult.claims.role;

          if (customRole) {
            set({ role: customRole });
          } else {
            // 🔁 Fall back to Firestore for role resolution
            let userRef;
            if (loginType === 'client') {
              userRef = doc(db, 'clients', firebaseUser.uid);
            } else {
              userRef = doc(db, 'staff', firebaseUser.uid);
            }

            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const data = userSnap.data();
              set({ role: data.role || null });

              // 🎯 Merge in Firestore profile info if present
              set((state) => ({
                profile: {
                  ...state.profile,
                  ...data, // caution: override if keys overlap
                },
              }));
            } else {
              console.warn('⚠️ Role not found in expected Firestore collection.');
              set({ role: null });
            }
          }
        } catch (err) {
          console.error('🔥 Error resolving user role via token/Firestore:', err);
          set({ role: null });
        }
      } else {
        // ❌ No logged-in user
        set({ user: null, role: null, profile: null });
      }

      set({ loading: false, isAppReady: true });
    });
  },

  // 🔓 Sign out the user and clean up state
  logout: async () => {
    await auth.signOut();
    set({ user: null, role: null, profile: null, loading: false });
  },

  // 🎯 Role-specific utility functions
  isSuperAdmin: () => get().role === 'superadmin',
  isStaff: () => ['staff', 'admin'].includes(get().role),
  isGuest: () => !get().user && !get().role,

  // 🔒 Flexible role checker: supports string or array
  hasRole: (roleOrRoles) => {
    const currentRole = get().role;
    if (!currentRole) return false;

    return Array.isArray(roleOrRoles)
      ? roleOrRoles.includes(currentRole)
      : currentRole === roleOrRoles;
  },
}));

export default useAuthenticStore;


//
// 🧠 useAuthenticStore.js – Central Firebase Auth & Role Manager
//
// 🔍 Purpose:
//   - Listens for auth state changes via Firebase
//   - Determines user role via custom claims or Firestore fallback
//   - Syncs and extends user profile metadata (email, name, photo, etc.)
//
// 🔁 Syncs With:
//   - ✅ useUserStore: keeps UI-reactive global user/role/profile in sync
//
// 📦 Core State:
//   - user: Firebase user object
//   - profile: Object with additional info (email, displayName, etc.)
//   - role: String (e.g. "staff", "client", "superadmin")
//   - loading: true while checking
//   - isAppReady: true once app has determined auth state
//
// 🔧 Actions:
//   - fetchUser(): Called on app init and after login
//   - logout(): Signs out and resets state
//
// ⚙️ Utilities:
//   - isSuperAdmin(), isStaff(), isGuest(), hasRole([... or string])
//
