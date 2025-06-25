import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { create } from 'zustand';
import useAuthenticStore from './AuthenticStore';

const useLoginStore = create((set, get) => ({
  email: '',
  password: '',
  loginType: 'client', // or 'staff' / 'admin'
  loading: false,
  error: null,

  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setLoginType: (type) => set({ loginType: type }),

  login: async () => {
    const { email, password } = get();
    const { fetchUser } = useAuthenticStore.getState(); // ✅ Tap into the global auth store

    set({ loading: true, error: null });

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await fetchUser(); // 🔁 Refresh user and role into useAuthenticStore

      return userCred.user;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLoginStore;


// store/useLoginStore.js

//
// 🔐 LoginStore – Handles login UI state and Firebase auth trigger
//
// Purpose:
//   - Manages login inputs for email, password, login type (e.g. client, staff)
//   - Triggers Firebase Auth sign-in
//   - After successful login, syncs user + role by calling useAuthenticStore().fetchUser()
//
// Core State:
//   - email, password, loginType
//   - loading (bool), error (string)
//
// Core Actions:
//   - setEmail(), setPassword(), setLoginType()
//   - login(): authenticates and syncs global auth state
//
// Why Separate?
//   - Keeps form logic and auth logic separate
//   - Easier to reuse across different login pages (ClientLogin, StaffLogin, etc.)
//   - Prevents polluting global state with local UI values
//

