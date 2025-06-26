// src/store/AuthenticStore.js
// 🔐 Unified Auth Store – Handles Login, Firebase Auth, Role Detection, Profile Sync

import { create } from 'zustand';
import { signInWithEmailAndPassword, onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const roleRedirectMap = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin-home',
  staff: '/staff-home',
  client: '/client-home',
};

const useAuthenticStore = create((set, get) => ({
  // 🔐 Auth & Profile State
  user: null,
  role: null,
  profile: null,
  loading: false,
  isAppReady: false,
  error: null,

  // 📝 Login Form Fields
  email: '',
  password: '',
  loginType: '',

  // ✍️ Input Mutators
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setLoginType: (val) => set({ loginType: val }),

  /**
   * 🔓 login – Full login flow
   * - Firebase Auth
   * - Custom Claims OR Firestore fallback
   * - Profile hydration
   * - Redirect
   */
  login: async (navigate) => {
    const { email, password, loginType } = get();
    set({ loading: true, error: null });

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCred.user;

      const tokenResult = await getIdTokenResult(firebaseUser, true);
      let resolvedRole = tokenResult.claims.role || null;

      const profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'Anonymous',
        photoURL: firebaseUser.photoURL || '',
      };

      // Fallback to Firestore role if no custom claim
      if (!resolvedRole) {
        const userRef = loginType === 'client'
          ? doc(db, 'clients', firebaseUser.uid)
          : doc(db, 'staff', firebaseUser.uid);

        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          resolvedRole = data.role || null;
          Object.assign(profile, data); // merge Firestore profile fields
        } else {
          console.warn('⚠️ Role not found in Firestore.');
        }
      }

      // Update Store
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
   * 🧠 initAuth – Called on app boot to sync existing auth state
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

      const profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'Anonymous',
        photoURL: firebaseUser.photoURL || '',
      };

      if (!resolvedRole) {
        const userRef = doc(db, 'staff', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          resolvedRole = data.role || null;
          Object.assign(profile, data);
        }
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

  // 🔓 Logout
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

  // 🎯 Role Utilities
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
