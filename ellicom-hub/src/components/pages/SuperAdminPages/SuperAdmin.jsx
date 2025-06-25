
import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';


const SuperAdmin = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="min-w-[64px]">
        <SuperAdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-background p-4 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdmin;

/*
🧭 SuperAdmin.jsx Summary

✅ Wraps all Super Admin routes with shared sidebar
✅ Uses <Outlet /> from react-router-dom to render nested child pages
✅ Part of /pages/SuperAdmin/ folder structure
✅ All children (Dashboard, CreateStaff, etc.) live under /superadmin/*
🔐 Should only be accessible via <RequireSuperAdmin /> protected route
*/
