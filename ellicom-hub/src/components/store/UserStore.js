import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const roleRedirectMap = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin/home',
  staff: '/staff/home',
  client: '/client/home',
  guest: '/guest/home',
};

const useUserStore = create(
  persist(
    (set, get) => ({
      // 🌍 Current logged-in user state
      user: null,
      role: null,
      isAppReady: false,
      loading: false,
      error: null,

      // 🗃️ All users in system (admin, staff, client, guest)
      allUsers: [],
      userLoading: false,

      // 🔐 Login form inputs
      email: '',
      password: '',

      // 🧰 Input updaters
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),

      // 🔐 Manual user setter (used post-creation)
      setUser: (user) => {
        const role = user?.role || 'guest';
        set({ user, role, isAppReady: true });
      },

      // 🚪 Login + redirect
      login: async (navigate) => {
        const { email, password } = get();
        set({ loading: true, error: null });

        try {
          const res = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const result = await res.json();
          if (!res.ok) throw new Error(result.error || 'Login failed');

          const user = result.user;
          const role = user.role || 'guest';

          set({ user, role, isAppReady: true });

          const redirect = roleRedirectMap[role] || '/unauthorized';
          navigate(redirect);
          return true;
        } catch (err) {
          set({ error: err.message });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // 🔄 Fetch all registered accounts
      fetchAllUsers: async () => {
        set({ userLoading: true });
        try {
          const res = await fetch('http://localhost:5001/users');
          const data = await res.json();
          set({ allUsers: data });
        } catch (err) {
          console.error('❌ fetchAllUsers error:', err);
        } finally {
          set({ userLoading: false });
        }
      },

      // Inside useUserStore
      deleteUser: async (userId) => {
        const { fetchAllUsers } = get();
        try {
          const response = await fetch(`http://localhost:5001/users/${userId}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete user');

          // Refetch to update UI
          await fetchAllUsers();
        } catch (err) {
          console.error('❌ Delete failed:', err.message);
        }
      },

      // 🧠 Session restore
      initUser: () => {
        const { user } = get();
        if (user) set({ isAppReady: true });
      },

      // 🚫 Full logout
      logout: () => {
        set({ user: null, role: null, isAppReady: false });
        localStorage.clear();
      },

      // 🔍 Role checkers
      hasRole: (roles) => {
        const { role } = get();
        return Array.isArray(roles) ? roles.includes(role) : role === roles;
      },

      isGuest: () => {
        const { role, user } = get();
        return !user || role === 'guest';
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
      }),
    }
  )
);

export default useUserStore;
