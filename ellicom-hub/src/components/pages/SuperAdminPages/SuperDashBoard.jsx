import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../../UI/Universal-UI/Head';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';
import useAuthenticStore from '../../store/AuthenticStore';

/**
 * SuperDashBoard.jsx – Super Admin Dashboard Page
 *
 * ✅ Displays quick overview stats (total staff, jobs, admins)
 * ✅ Includes navigation links to key SuperAdmin actions (create staff, view jobs, manage roles)
 * ✅ Uses shared components like Head and SuperAdminSidebar
 * ✅ Designed with Tailwind for responsive layout and branding
 *
 * Used by: Only users with "superadmin" role
 */

const SuperDashBoard = () => {
  const { profile } = useAuthenticStore();
  const firstName = profile?.displayName?.split(' ')[0] || 'SuperAdmin';

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
        {/* Welcome Text */}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Link to="/superadmin/create-staff">
            <div className="bg-gold text-container p-4 rounded-lg shadow-md text-center hover:scale-95 transition-transform">
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
          <Link to="/superadmin/manage-roles">
            <div className="bg-gold text-container p-4 rounded-lg shadow-md text-center hover:scale-95 transition-transform">
              Manage Roles
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperDashBoard;
