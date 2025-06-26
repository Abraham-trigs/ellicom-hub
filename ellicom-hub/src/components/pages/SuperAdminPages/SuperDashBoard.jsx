import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Head from '../../UI/Universal-UI/Head';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';
import useAuthenticStore from '../../store/AuthenticStore';
import { setUserRole } from '../../../utils/userRole';
/**
 * SuperDashBoard.jsx – Super Admin Dashboard Page
 *
 * ✅ Displays quick overview stats (total staff, jobs, admins)
 * ✅ SuperAdmin can assign roles via setCustomClaims
 * ✅ Uses shared components like Head and SuperAdminSidebar
 * ✅ Designed with Tailwind for responsive layout and branding
 */

const SuperDashBoard = () => {
  const { profile } = useAuthenticStore();
  const firstName = profile?.displayName?.split(' ')[0] || 'SuperAdmin';

  const [uid, setUid] = useState('');
  const [role, setRole] = useState('staff');
  const [message, setMessage] = useState('');

  const handleAssign = async () => {
    try {
      const response = await setUserRole(uid, role);
      setMessage(response);
      setUid('');
      setRole('staff');
    } catch (err) {
      setMessage(err.message);
    }
  };

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

        {/* 🔐 Assign Role Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">
          <h2 className="text-lg font-semibold mb-2 text-head">Assign Role to User</h2>
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Enter User UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
          <select
            className="border p-2 rounded w-full mb-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
          <button
            className="bg-gold text-white px-4 py-2 rounded hover:opacity-90"
            onClick={handleAssign}
          >
            Assign Role
          </button>
          {message && <p className="mt-2 text-sm text-blue-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SuperDashBoard;
