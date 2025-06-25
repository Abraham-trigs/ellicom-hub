

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSuperAdminStore = create(
  persist(
    (set) => ({
      // 🎛️ UI State
      isOpen: false,
      activeTab: 'Dashboard',

      // 📊 Dashboard Metrics (to be updated from Firestore)
      totalStaff: 0,
      totalJobs: 0,
      pendingJobs: 0,
      totalAdmins: 0,

      // 📦 Actions – Sidebar Controls
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      closeSidebar: () => set({ isOpen: false }),
      setActiveTab: (tab) => set({ activeTab: tab }),

      // 🔄 Actions – Dashboard Data
      setStats: (stats) =>
        set((state) => ({
          totalStaff: stats.totalStaff ?? state.totalStaff,
          totalJobs: stats.totalJobs ?? state.totalJobs,
          pendingJobs: stats.pendingJobs ?? state.pendingJobs,
          totalAdmins: stats.totalAdmins ?? state.totalAdmins,
        })),
    }),
    {
      name: 'superadmin-store', // 📁 Key for localStorage
      partialize: (state) => ({
        isOpen: state.isOpen,
        activeTab: state.activeTab,
        // Optionally persist some metrics if needed
        totalStaff: state.totalStaff,
        totalJobs: state.totalJobs,
        pendingJobs: state.pendingJobs,
        totalAdmins: state.totalAdmins,
      }),
    }
  )
);

export default useSuperAdminStore;



//
// useSuperAdminStore – Zustand state management for Super Admin features
//
// UI State:
//   - isOpen: Sidebar open/close toggle
//   - activeTab: Tracks currently active tab for navigation + styling
//
// Dashboard Data (optional):
//   - totalStaff, totalJobs, pendingJobs, totalAdmins
//   - Can be fed real-time values from Firestore later
//
// Actions:
//   - toggleSidebar(), closeSidebar(), setActiveTab()
//   - setStats(): Accepts partial object with job/staff metrics
//
// Persistence:
//   - Powered by Zustand's `persist` middleware
//   - Sidebar and metrics remembered after reloads
//
