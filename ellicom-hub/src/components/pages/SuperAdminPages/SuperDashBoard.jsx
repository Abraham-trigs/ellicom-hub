// src/pages/SuperAdmin/SuperDashBoard.jsx
// 🛡️ Super Admin Dashboard – Refactored with Unified Zustand Store

import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../../UI/Universal-UI/Head';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';
import useUserStore from '../../store/UserStore';

const SuperDashBoard = () => {
  const { user } = useUserStore();
  const firstName = user?.displayName?.split(' ')[0] || 'SuperAdmin';

  return (
    <div className='border-gold border-b-1 h-23 mb-5'>
      {/* Sidebar */}
      <div className="mt-10 flex flex-col justify-end">
        <div className="w-full">
          <div className='flex flex-row justify-end'>
            <SuperAdminSidebar />
          </div>
        </div>
      </div>

      {/* Logo/Header */}
      <div className='scale-50 -mt-26'>
        <Head />
      </div>

      {/* Main Content */}
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold text-gold mb-4">
          Welcome, {firstName}
        </h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-sm text-container">Total Staff</p>
            <p className="text-xl font-semibold text-high">14</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-sm text-container">Pending Jobs</p>
            <p className="text-xl font-semibold text-high">5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-sm text-container">Total Jobs</p>
            <p className="text-xl font-semibold text-high">120</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-sm text-container">Admins</p>
            <p className="text-xl font-semibold text-high">3</p>
          </div>
        </div>

        {/* Navigation Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <Link to="/superadmin/create-staff">
            <div className="bg-gold text-container p-4 rounded-lg shadow-md text-center hover:scale-95 transition-transform cursor-pointer">
              Create Staff
            </div>
          </Link>
          <Link to="/superadmin/all-staff">
            <div className="bg-gold text-container p-4 rounded-lg shadow-md text-center hover:scale-95 transition-transform">
              View All Staff
            </div>
          </Link>
          <Link to="/superadmin/all-jobs">
            <div className="bg-gold text-container p-4 rounded-lg shadow-md text-center hover:scale-95 transition-transform">
              View All Jobs
            </div>
          </Link>
          <Link to="/guest/add-job">
            <div className="bg-gold text-container p-4 rounded-lg shadow-md text-center hover:scale-95 transition-transform">
              Guest Job Request
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperDashBoard;

/*
📝 SuperDashBoard.jsx Summary (Updated)

✅ Uses unified Zustand store (useUserStore) instead of useAuthenticStore.
✅ Sidebar and head components remain unchanged.
✅ Role-based greeting powered by Zustand user state.
✅ Removed deprecated "Assign Role" Firebase logic.
✅ Replaced it with a placeholder action: "Guest Job Request".
*/
