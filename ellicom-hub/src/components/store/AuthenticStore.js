import { create } from 'zustand';
import { signInWithEmailAndPassword, onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// 🧭 Role → Route Redirect Map
const roleRedirectMap = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin-home',
  staff: '/staff-home',
  client: '/client-home',
};

const useAuthenticStore = create((set, get) => ({
  // 🔐 Core Auth State
  user: null,
  role: null,
  profile: null,
  loading: false,
  isAppReady: false,
  error: null,

  // 🧾 Login Form State
  email: '',
  password: '',
  loginType: '',

  // ✍️ Input Updaters
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setLoginType: (val) => set({ loginType: val }),

  /**
   * 🔓 login – Handles full login + Firestore profile fallback
   */
  login: async (navigate) => {
    const { email, password, loginType } = get();
    set({ loading: true, error: null });

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCred.user;

      // 🔍 Try to pull custom claims (if any)
      const tokenResult = await getIdTokenResult(firebaseUser, true);
      let resolvedRole = tokenResult.claims.role || null;

      // 📦 Basic fallback profile from Firebase Auth
      let profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
      };

      // 🧠 Load extra profile from Firestore based on loginType
      const userRef = loginType === 'client'
        ? doc(db, 'clients', firebaseUser.uid)
        : doc(db, 'staff', firebaseUser.uid);

      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();

        // 🏷️ Merge role + displayName from Firestore
        resolvedRole = resolvedRole || data.role || null;
        profile = {
          ...profile,
          ...data,
          displayName: data.name || data.fullName || firebaseUser.displayName || 'User',
        };
      } else {
        console.warn('⚠️ No Firestore profile found.');
      }

      // ✅ Sync with Zustand store
      set({
        user: firebaseUser,
        profile,
        role: resolvedRole,
        isAppReady: true,
      });

      // 🚀 Redirect based on role
      const redirectPath = roleRedirectMap[resolvedRole] || '/unauthorized';
      navigate(redirectPath);
      return firebaseUser;
    } catch (err) {
      console.error('Login Error:', err.message);
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * 🧠 initAuth – On app boot, restore user + Firestore data
   */
  initAuth: () => {
    set({ loading: true });

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        set({ user: null, role: null, profile: null, isAppReady: true, loading: false });
        return;
      }

      const tokenResult = await getIdTokenResult(firebaseUser);
      let resolvedRole = tokenResult.claims.role || null;

      let userRef = doc(db, 'staff', firebaseUser.uid); // default to staff
      if (resolvedRole === 'client') {
        userRef = doc(db, 'clients', firebaseUser.uid);
      }

      let profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
      };

      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          resolvedRole = resolvedRole || data.role || null;

          profile = {
            ...profile,
            ...data,
            displayName: data.name || data.fullName || firebaseUser.displayName || 'User',
          };
        }
      } catch (err) {
        console.warn('Firestore read failed:', err.message);
      }

      set({
        user: firebaseUser,
        profile,
        role: resolvedRole,
        loading: false,
        isAppReady: true,
      });
    });
  },

  /**
   * 🔓 logout – Clears session + state
   */
  logout: async () => {
    await auth.signOut();
    set({
      user: null,
      role: null,
      profile: null,
      loading: false,
      isAppReady: false,
    });
  },

  // 🎯 Role Helpers
  isSuperAdmin: () => get().role === 'superadmin',
  isStaff: () => ['staff', 'admin'].includes(get().role),
  isGuest: () => !get().user && !get().role,
  hasRole: (roleOrRoles) => {
    const role = get().role;
    if (!role) return false;
    return Array.isArray(roleOrRoles)
      ? roleOrRoles.includes(role)
      : role === roleOrRoles;
  },
}));

export default useAuthenticStore;



// NOTES 
// 🧠 AuthenticStore.js — Current Responsibilities
// 🔐 Auth State: Manages user, role, profile, loading, isAppReady, and error.

// 📥 Login Logic: Authenticates with Firebase, fetches custom claims or Firestore role, hydrates profile, and redirects based on role.

// 🧠 App Boot Init: On refresh, rehydrates user session and role by listening to onAuthStateChanged, then pulls Firestore data for fallback.

// 🚪 Logout: Signs out the user and resets all auth-related state.

// 🎛️ Form State: Tracks login form values (email, password, loginType) with setters.

// 🧰 Role Utils: Provides helpers like isSuperAdmin(), isStaff(), hasRole() to gate UI/routes based on role.

// 📦 Zustand Store: Centralizes all auth and role logic in one global state.
