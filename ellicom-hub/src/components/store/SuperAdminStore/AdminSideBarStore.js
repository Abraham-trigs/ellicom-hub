
/**
 * Sidebar Store – Zustand Global State (With Persistence)
 * -------------------------------------------------------
 * Manages:
 * - Sidebar open/close state
 * - Active navigation tab
 * - Local storage persistence
 *
 * Middleware:
 * - Zustand 'persist' middleware keeps sidebar state on reloads
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAdminSideBarStore = create(
  persist(
    (set) => ({
      isOpen: false,
      activeTab: 'Dashboard',

      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      closeSidebar: () => set({ isOpen: false }),
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'sidebar-storage', // name of item in localStorage
      partialize: (state) => ({
        isOpen: state.isOpen,
        activeTab: state.activeTab,
      }),
    }
  )
);

export default useAdminSideBarStore;
