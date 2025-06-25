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

const roleRedirectMap = {
  superadmin: 'dashboard',
  admin: '/admin-home',
  staff: '/staff-home',
  client: '/client-home',
};

const useLoginStore = create((set, get) => ({
  email: '',
  password: '',
  loginType: '',
  loading: false,
  error: null,

  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setLoginType: (type) => set({ loginType: type }),

  login: async (navigate) => {
    const { email, password, loginType } = get();
    const { fetchUser } = useAuthenticStore.getState();

    set({ loading: true, error: null });

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // 🔁 Pass loginType to fetchUser()
      await fetchUser(loginType);

      const currentRole = useAuthenticStore.getState().role;
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
// 🛂 useLoginStore.js – Login Form Handler + Auth Trigger
//
// 🔍 Purpose:
//   - Local state for login form fields (email, password)
//   - Handles login flow via Firebase Auth
//   - Triggers fetchUser() from useAuthenticStore
//   - Redirects user based on resolved role
//
// 🔁 Syncs With:
//   - ✅ useAuthenticStore: to refresh user + role
//   - ✅ useUserStore: updates global role/user state for UI
//
// 📦 State:
//   - email, password, loginType (optional for UI labeling)
//   - loading: login progress state
//   - error: for invalid credentials or Firebase errors
//
// 🔧 Actions:
//   - setEmail(), setPassword(), setLoginType()
//   - login(navigate): calls Firebase login, then redirects
//
