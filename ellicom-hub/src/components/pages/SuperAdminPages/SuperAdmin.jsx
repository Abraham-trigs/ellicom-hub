import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';

/**
 * SuperAdmin.jsx – Layout Wrapper for All Super Admin Routes
 *
 * ✅ Wraps all child routes with shared SuperAdminSidebar
 * ✅ Uses <Outlet /> from react-router-dom to render nested pages
 * ✅ All pages live under /superadmin/*
 * 🔒 Should be protected using <RequireSuperAdmin /> route guard
 */

const SuperAdmin = () => {
  return (
    <div className="flex">
      {/* Sidebar navigation */}
      <div className="min-w-[64px]">
        <SuperAdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-background p-4 min-h-screen">
        {/* Future: Add topbar or breadcrumbs here if needed */}
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdmin;
