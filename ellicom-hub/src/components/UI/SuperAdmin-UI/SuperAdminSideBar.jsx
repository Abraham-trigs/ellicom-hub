// src/UI/SuperAdmin-UI/SuperAdminSidebar.jsx
// 🧭 SuperAdminSidebar – Sidebar UI & Navigation for SuperAdmin pages

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Users,
  ClipboardList,
  PackageCheck,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Award,
  LineChart,
  LayoutDashboard,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Universal-UI/logo';
import useAuthenticStore from '../../store/AuthenticStore';

const navItems = [
  { label: 'Dashboard', Icon: LayoutDashboard, path: '/superadmin/dashboard' },
  { label: 'Staff Management', Icon: Users, path: '/superadmin/all-staff' },
  { label: 'Create Staff', Icon: Award, path: '/superadmin/create-staff' },
  { label: 'Job Queue', Icon: ClipboardList, path: '/superadmin/all-jobs' },
  { label: 'Manage Roles', Icon: Settings, path: '/superadmin/manage-roles' },
];

const SideNav = () => {
  const { isOpen, closeSidebar, activeTab, setActiveTab } = useAuthenticStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />

          <motion.nav
            className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-container shadow-xl z-50 flex flex-col p-6 rounded-l-4xl border-2 border-sea"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={closeSidebar}
              aria-label="Close menu"
              className="p-2 rounded hover:bg-inactive transition self-end"
            >
              <X className="w-6 h-6 text-gold hover:text-container" />
            </button>

            <div className="flex flex-col items-center -mt-10 text-center">
              <div className="scale-75">
                <Logo />
              </div>
              <div className="mb-4 -mt-3 text-xl font-semibold text-head">
                Super Admin
              </div>

              <div className="mb-6">
                <button
                  className="bg-sea px-7 py-2 text-ground rounded-lg font-normal text-center 
                  transition ease-in-out duration-200 hover:bg-high hover:scale-95"
                  onClick={() => {
                    navigate('/add-job');
                    closeSidebar();
                  }}
                >
                  New Job <span className="font-black">+</span>
                </button>
              </div>
            </div>

            <ul className="w-full flex flex-col items-center">
              {navItems.map(({ label, Icon, path }, index) => (
                <React.Fragment key={label}>
                  <li>
                    <button
                      onClick={() => {
                        navigate(path);
                        setActiveTab(label);
                        closeSidebar();
                      }}
                      className={`w-full flex items-center gap-3 py-2 px-3 m-1 rounded transition ${
                        activeTab === label
                          ? 'bg-gold text-container font-semibold'
                          : 'text-head hover:bg-gold hover:text-container hover:font-semibold'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  </li>
                  {index !== navItems.length - 1 && (
                    <hr className="border-gold w-full my-1" />
                  )}
                </React.Fragment>
              ))}
            </ul>

            <div className="w-full mt-auto pt-6">
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
                onClick={() => {
                  console.log('Logout clicked');
                  closeSidebar();
                }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

const SuperAdminSidebar = () => {
  const { isOpen, toggleSidebar } = useAuthenticStore();

  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
      >
        {!isOpen ? (
          <>
            <span className="block w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded" />
            <span className="block w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded" />
            <span className="block w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded" />
          </>
        ) : (
          <X className="w-7 h-7 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      <SideNav />
    </>
  );
};

export default SuperAdminSidebar;

/**
 * 📌 SuperAdminSidebar Notes
 *
 * ✅ Handles mobile-friendly, animated Super Admin sidebar UI
 * ✅ Built with:
 *    - Zustand for state management (isOpen, toggleSidebar, setActiveTab)
 *    - Framer Motion for transitions and animations
 *    - Lucide React for icons
 *    - React Router's `navigate` for route control
 *
 * 🧠 Features:
 * - Toggles visibility of a right-slide-in sidebar panel
 * - Tracks which nav tab is active using `activeTab`
 * - Real route paths wired per SuperAdmin use case
 * - Clean logout button (currently stubbed – should link to logout logic)
 *
 * 🔐 Zustand State Accessed:
 * - `isOpen`           → boolean to show/hide sidebar
 * - `toggleSidebar()`  → toggles isOpen
 * - `closeSidebar()`   → force-closes sidebar
 * - `activeTab`        → string label of current nav tab
 * - `setActiveTab()`   → updates current tab label
 *
 * 🏁 Final Purpose:
 * - Acts as a central navigation system for the SuperAdmin layout
 * - Easy to extend with more routes or sidebar buttons
 */
