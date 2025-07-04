// ✅ Zustand Store - useUserStore.js
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
      user: null,
      role: null,
      isAppReady: false,
      loading: false,
      error: null,

      email: '',
      password: '',
      rememberMe: false,

      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setRememberMe: (rememberMe) => set({ rememberMe }),

      setUser: (user) => {
        const role = user?.role || 'guest';
        set({ user, role, isAppReady: true });
      },

      allUsers: [],
      userLoading: false,

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

      deleteUser: async (userId) => {
        const { fetchAllUsers } = get();
        try {
          const response = await fetch(`http://localhost:5001/users/${userId}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete user');
          await fetchAllUsers();
        } catch (err) {
          console.error('❌ Delete failed:', err.message);
        }
      },

      login: async (navigate) => {
        const { email, password, rememberMe } = get();
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

          if (rememberMe) {
            localStorage.setItem('remember_user', JSON.stringify({ user, role }));
          } else {
            localStorage.removeItem('remember_user');
          }

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

      initUser: () => {
        const remembered = localStorage.getItem('remember_user');
        if (remembered) {
          const parsed = JSON.parse(remembered);
          set({
            user: parsed.user,
            role: parsed.role,
            isAppReady: true,
            rememberMe: true,
          });
        } else {
          const { user } = get();
          if (user) set({ isAppReady: true });
        }
      },

      logout: () => {
        set({ user: null, role: null, isAppReady: false, rememberMe: false });
        localStorage.removeItem('remember_user');
        localStorage.clear();
      },

      hasRole: (roles) => {
        const { role } = get();
        return Array.isArray(roles) ? roles.includes(role) : role === roles;
      },

      isGuest: () => {
        const { role, user } = get();
        return !user || role === 'guest';
      },

      getAdminCount: () => get().allUsers.filter((u) => u.role === 'admin').length,
      getStaffCount: () => get().allUsers.filter((u) => u.role === 'staff').length,
      getClientCount: () => get().allUsers.filter((u) => u.role === 'client').length,
      getGuestCount: () => get().allUsers.filter((u) => u.role === 'guest').length,
      getTotalUsers: () => get().allUsers.length,
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        rememberMe: state.rememberMe,
      }),
    }
  )
);

export default useUserStore;
