// 🔐 useLoginStore.login() triggers signInWithEmailAndPassword
// 🧠 It then calls useAuthenticStore.fetchUser()
// 🧬 fetchUser() listens to Firebase auth and resolves role
// 🔄 Both stores (AuthenticStore and UserStore) are synced
// 🚀 UI everywhere can just use useUserStore() for reactive user info

// store/useLoginStore.js

import { create } from 'zustand';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import useAuthenticStore from './AuthenticStore';
import useUserStore from './UserStore'; // ✅ synced after login

// 🧭 Role-based redirection paths
const roleRedirectMap = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin-home',
  staff: '/staff-home',
  client: '/client-home',
};

const useLoginStore = create((set, get) => ({
  // 📝 Local login form state
  email: '',
  password: '',
  loginType: '',

  // 🔄 Status flags
  loading: false,
  error: null,

  // 🧰 Mutators for form fields
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setLoginType: (type) => set({ loginType: type }),

  /**
   * 🔐 login() – Main login handler
   * - Calls Firebase Auth
   * - Syncs role via `useAuthenticStore`
   * - Syncs Firestore user profile via `useUserStore`
   * - Redirects user to role-based home
   */
  login: async (navigate) => {
    const { email, password, loginType } = get();
    const { fetchUser } = useAuthenticStore.getState();
    const { fetchUserAndRole } = useUserStore.getState();

    set({ loading: true, error: null });

    try {
      // 🔐 Firebase login
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // 🧠 Sync Firebase auth & custom claims
      await fetchUser(loginType);

      // 🔄 Sync Firestore user profile to Zustand
      await fetchUserAndRole();

      // 🧭 Route user based on resolved role
      const currentRole = useAuthenticStore.getState().role;
      const redirectPath = roleRedirectMap[currentRole] || '/unauthorized';

      navigate(redirectPath);
      return userCred.user;
    } catch (err) {
      console.error('🔥 Login error:', err.message);
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLoginStore;


//
// 🛂 useLoginStore.js – Login Form Handler + Auth Trigger
//
// 🔍 Purpose:
//   - Manages email/password login form state (email, password, loginType)
//   - Calls Firebase signInWithEmailAndPassword()
//   - Syncs with `useAuthenticStore.fetchUser()` for role detection
//   - Syncs with `useUserStore.fetchUserAndRole()` to hydrate UI
//   - Automatically redirects based on resolved role
//
// 🔁 Syncs With:
//   - ✅ useAuthenticStore: loads Firebase user & custom claims or Firestore fallback
//   - ✅ useUserStore: updates user profile info globally (e.g. email, name)
//
// 📦 Local State:
//   - email: string – email input field
//   - password: string – password input field
//   - loginType: string – optional login context (staff/client)
//   - loading: boolean – used for showing spinners, disabling buttons
//   - error: string|null – for Firebase login errors
//
// 🔧 Actions:
//   - setEmail(val): update email field
//   - setPassword(val): update password field
//   - setLoginType(type): define role context
//   - login(navigate): handles full login and navigation
//
// ✅ Author: Abraham Bortey Danfa
//

