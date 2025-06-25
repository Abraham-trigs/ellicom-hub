// 🔐 useLoginStore.login() triggers signInWithEmailAndPassword

// 🧠 It then calls useAuthenticStore.fetchUser()

// 🧬 fetchUser() listens to Firebase auth and resolves role

// 🔄 Both stores (AuthenticStore and UserStore) are synced

// 🚀 UI everywhere can just use useUserStore() for reactive user info


import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  role: null,

  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),

  resetUser: () => set({ user: null, role: null }),
}));

export default useUserStore;


//
// 📦 useUserStore.js – Lightweight Reactive Store for UI
//
// 🔍 Purpose:
//   - Holds `user` and `role` for global UI access (without re-fetching)
//   - Used in navbars, dashboards, conditional renders, etc.
//
// 🧠 Fed by:
//   - ✅ useAuthenticStore (on app start & login)
//   - ✅ useLoginStore (after Firebase login success)
//
// 📦 State:
//   - user: Firebase user (can access email, UID, etc.)
//   - role: One of 'staff', 'client', 'superadmin', etc.
//
// 🔧 Actions:
//   - setUser(user): update user
//   - setRole(role): update role
//   - resetUser(): clears both
//




