// ✅ SuperDashBoard.jsx – Fully Zustand-Connected
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Head from '../../UI/Universal-UI/Head';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';
import useUserStore from '../../store/UserStore';

const SuperDashBoard = () => {
  const {
    user,
    fetchAllUsers,
    getAdminCount,
    getStaffCount,
    getClientCount,
    getGuestCount,
    getTotalUsers,
  } = useUserStore();

  const firstName = user?.displayName?.split(' ')[0] || 'SuperAdmin';

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

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
          {/* <StatCard label="Pending Jobs" value={getAdminCount()} />
          <StatCard label="Total Jobs" value={getStaffCount()} /> */}

          <StatCard label="Total Users" value={getTotalUsers()} />
          <StatCard label="Admins" value={getAdminCount()} />
          <StatCard label="Staffs" value={getStaffCount()} />
          <StatCard label="Clients" value={getClientCount()} />
          <StatCard label="Guests" value={getGuestCount()} />
        </div>

        {/* Navigation Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <Link to="/superadmin/create-staff">
            <Tile label="Create Account" />
          </Link>
          <Link to="/superadmin/accounts">
            <Tile label="Accounts" />
          </Link>
          <Link to="/superadmin/all-jobs">
            <Tile label="View All Jobs" />
          </Link>
          <Link to="/guest/add-job">
            <Tile label="Guest Job Request" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center">
    <p className="text-sm text-container">{label}</p>
    <p className="text-xl font-semibold text-high">{value}</p>
  </div>
);

const Tile = ({ label }) => (
  <div className="bg-gold text-container p-4 rounded-lg shadow-md text-center hover:scale-95 transition-transform cursor-pointer">
    {label}
  </div>
);

export default SuperDashBoard;
