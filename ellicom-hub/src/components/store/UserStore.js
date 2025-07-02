import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const roleRedirectMap = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin-home',
  staff: '/staff-home',
  client: '/client-home',
  guest: '/guest-home',
};

const useUserStore = create(
  persist(
    (set, get) => ({
      // 🧠 Core state for all users
      user: null,       // Entire user object (incl. role, metadata)
      role: null,
      loading: false,
      isAppReady: false,
      error: null,

      // 🔑 Login form state
      email: '',
      password: '',

      // 🧰 Input handlers
      setEmail: (val) => set({ email: val }),
      setPassword: (val) => set({ password: val }),

      // 📦 Manual user sync (e.g. from account creation)
      setUser: (user) => {
        const role = user?.role || 'guest';
        set({ user, role, isAppReady: true });
      },

      /**
       * 🔓 Login with backend-authenticated user fetch
       */
      login: async (navigate) => {
        const { email, password } = get();
        set({ loading: true, error: null });

        try {
          const response = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'Login failed');

          const user = result.user;
          const role = user.role || 'guest';

          // Store full user object
          set({ user, role, isAppReady: true });

          // Navigate
          const redirectPath = roleRedirectMap[role] || '/unauthorized';
          navigate(redirectPath);
          return true;
        } catch (err) {
          set({ error: err.message });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      /**
       * 🧠 Boot/restore session from localStorage
       */
      initUser: () => {
        const stored = get();
        if (stored.user) {
          set({ isAppReady: true });
        }
      },

      /**
       * 🔒 Logout + clear
       */
      logout: () => {
        set({ user: null, role: null, isAppReady: false });
        localStorage.clear();
      },

      // 🎯 Role helpers
      hasRole: (roleOrRoles) => {
        const role = get().role;
        if (!role) return false;
        return Array.isArray(roleOrRoles)
          ? roleOrRoles.includes(role)
          : role === roleOrRoles;
      },

      isGuest: () => {
        const { user, role } = get();
        return !user || role === 'guest';
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ user: state.user, role: state.role }),
    }
  )
);

export default useUserStore;
