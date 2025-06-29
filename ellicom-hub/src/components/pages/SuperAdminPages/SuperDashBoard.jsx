// src/pages/SuperAdmin/SuperDashBoard.jsx
// 🛡️ Super Admin Dashboard – Role Overview + Secure Role Assignment UI

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Head from '../../UI/Universal-UI/Head';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';
import useAuthenticStore from '../../store/AuthenticStore';
import { assignCustomRole } from '../../../utils/firebaseRoleUtils'; // ✅ Correct role assign util

const SuperDashBoard = () => {
  const { profile } = useAuthenticStore();
  const firstName = profile?.displayName?.split(' ')[0] || 'SuperAdmin';

  // 🔄 Role Form State
  const [uid, setUid] = useState('');
  const [role, setRole] = useState('staff');
  const [message, setMessage] = useState('');

  // 🚀 Role Assignment Handler
  const handleAssign = async () => {
    try {
      const result = await assignCustomRole(uid, role);
      setMessage(result);
      setUid('');
      setRole('staff');
    } catch (err) {
      setMessage(`❌ ${err.message}`);
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

/*
📝 SuperDashBoard.jsx Summary

✅ Super Admin landing page showing stats and management actions.
✅ Navigation tiles route to create/view staff, jobs, or roles.
✅ Assign Role Panel updates user roles via Firebase callable functions.
✅ Uses Zustand for reactive role-based UI (profile from useAuthenticStore).
✅ "Create Staff" button navigates to the full CreateStaffForm at /superadmin/create-staff.
*/
