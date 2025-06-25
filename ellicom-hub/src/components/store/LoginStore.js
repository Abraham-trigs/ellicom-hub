// store/useLoginStore.js

import { create } from 'zustand';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import useAuthenticStore from './AuthenticStore';

const roleRedirectMap = {
  superadmin: 'dashboard',
  admin: '/admin-home',
  staff: '/staff-home',
  client: '/client-home',
};

const useLoginStore = create((set, get) => ({
  // 🔐 UI state for login form
  email: '',
  password: '',
  loginType: '', // Can be client, staff, admin — optional for UI context
  loading: false,
  error: null,

  // ✏️ Input setters
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setLoginType: (type) => set({ loginType: type }),

  /**
   * 🔁 Login function
   * - Signs in user via Firebase Auth
   * - Triggers global user + role state update
   * - Redirects based on user role
   *
   * @param {Function} navigate - useNavigate() from react-router-dom
   */
  login: async (navigate) => {
    const { email, password } = get();
    const { fetchUser, role } = useAuthenticStore.getState();

    set({ loading: true, error: null });

    try {
      // 🔐 Attempt Firebase login
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // 🔄 Refresh global user info and role
      await fetchUser();
      const currentRole = useAuthenticStore.getState().role;

      // 🚦 Redirect based on role
      const redirectPath = roleRedirectMap[currentRole] || '/unauthorized';
      navigate(redirectPath);

      return userCred.user;
    } catch (err) {
      console.error('Login error:', err.message);
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLoginStore;


//
// 🏗️ useLoginStore.js – Auth UI + Middleware Logic
//
// Description:
//   - Handles local state for login inputs (email, password, loginType)
//   - Performs Firebase login via signInWithEmailAndPassword
//   - Syncs user & role to global `useAuthenticStore`
//   - Redirects user based on resolved role (superadmin, admin, staff, client)
//
// Usage:
//   - Wrap login pages in useLoginStore()
//   - Call login(navigate) on form submit
//
// Why not merge with useAuthenticStore?
//   - Separation of concerns: keep form state + Firebase triggers isolated
//   - Makes testing, reuse, and expansion (biometrics, 2FA) easier
//
// Author: Abraham Bortey Danfa 🛠️
//
