// src/store/AuthenticStore.js
import { create } from 'zustand';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getIdTokenResult,
} from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// 🧭 Role-to-Route Redirect Map
const roleRedirectMap = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin-home',
  staff: '/staff-home',
  client: '/client-home',
};

const useAuthenticStore = create((set, get) => ({
  // 🔐 Core Auth State
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  role: localStorage.getItem('authRole') || null,
  profile: JSON.parse(localStorage.getItem('authProfile')) || null,
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
   * 🔓 login – Handles login, claims, and profile resolution
   */
  login: async (navigate) => {
    const { email, password, loginType } = get();
    set({ loading: true, error: null });

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCred.user;

      const tokenResult = await getIdTokenResult(firebaseUser, true);
      let resolvedRole = tokenResult.claims.role || null;

      let profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
      };

      const userRef =
        loginType === 'client'
          ? doc(db, 'clients', firebaseUser.uid)
          : doc(db, 'staff', firebaseUser.uid);

      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();

        resolvedRole = resolvedRole || data.role || null;
        profile = {
          ...profile,
          ...data,
          displayName: data.name || data.fullName || firebaseUser.displayName || 'User',
        };
      } else {
        console.warn('⚠️ No Firestore profile found.');
      }

      // ✅ Sync Zustand and localStorage
      localStorage.setItem('authUser', JSON.stringify(firebaseUser));
      localStorage.setItem('authRole', resolvedRole);
      localStorage.setItem('authProfile', JSON.stringify(profile));

      set({
        user: firebaseUser,
        profile,
        role: resolvedRole,
        isAppReady: true,
      });

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
   * 🧠 initAuth – Restore user on boot + localStorage fallback
   */
  initAuth: () => {
    set({ loading: true });

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        localStorage.clear();
        set({ user: null, role: null, profile: null, isAppReady: true, loading: false });
        return;
      }

      const tokenResult = await getIdTokenResult(firebaseUser);
      let resolvedRole = tokenResult.claims.role || null;

      let userRef = doc(db, 'staff', firebaseUser.uid);
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

      localStorage.setItem('authUser', JSON.stringify(firebaseUser));
      localStorage.setItem('authRole', resolvedRole);
      localStorage.setItem('authProfile', JSON.stringify(profile));

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
   * 🔓 logout – Signs out and resets store + localStorage
   */
  logout: async () => {
    await auth.signOut();
    localStorage.clear();
    set({
      user: null,
      role: null,
      profile: null,
      loading: false,
      isAppReady: false,
    });
  },

  // 🎯 Role Check Utilities
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

// ============================================================
// ✅ AuthenticStore.js – Final Version with Recommended Moves
// ============================================================

// 🔐 Centralized auth/role/profile state using Zustand
// 🧠 Supports login, persistent auth (via localStorage), and rehydration
// 🚀 Automatically redirects users based on their role
// 🔁 Keeps Firebase user state in sync with Firestore profile data
// 📦 Profile merged from Firebase Auth and Firestore for flexibility
// 💾 LocalStorage used to retain login across page refreshes
// 🔧 Includes reusable helpers: isSuperAdmin, isStaff, hasRole
// 📣 Easily extendable to support refresh tokens, session expiration, etc.
