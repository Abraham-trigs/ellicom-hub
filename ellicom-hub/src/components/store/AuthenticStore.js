import { create } from 'zustand';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const useAuthenticStore = create((set, get) => ({
  user: null,
  role: null,
  loading: true,
  isAppReady: false,

  // 🔁 Real-time auth listener + role resolver
  fetchUser: async () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        set({ user: firebaseUser });

        try {
          await firebaseUser.getIdToken(true); // force refresh
          const tokenResult = await getIdTokenResult(firebaseUser);
          const customRole = tokenResult.claims.role;

          if (customRole) {
            set({ role: customRole });
          } else {
            const userRef = doc(db, 'staff', firebaseUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              set({ role: userSnap.data().role || null });
            } else {
              console.warn('⚠️ Role not found in Firestore.');
              set({ role: null });
            }
          }
        } catch (err) {
          console.error('🔥 Error retrieving user role:', err);
          set({ role: null });
        }
      } else {
        set({ user: null, role: null });
      }

      set({ loading: false, isAppReady: true });
    });
  },

  // 🧼 Logout helper
  logout: async () => {
    await auth.signOut();
    set({ user: null, role: null, loading: false });
  },

  // 💡 Utility functions (optional)
  isSuperAdmin: () => get().role === 'superadmin',
  isStaff: () => ['staff', 'admin'].includes(get().role),
  isGuest: () => !get().user && !get().role,
  hasRole: (rolesArray) => rolesArray.includes(get().role),
}));

export default useAuthenticStore;
