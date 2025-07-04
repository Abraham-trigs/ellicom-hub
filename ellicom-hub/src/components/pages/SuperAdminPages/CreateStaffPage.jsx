// src/pages/SuperAdmin/CreateStaffPage.jsx
// 🧾 Page for SuperAdmin to create Staff or Admin users

import React from 'react';
import SuperAdminSidebar from '../../UI/SuperAdmin-UI/SuperAdminSideBar';
import Head from '../../UI/Universal-UI/Head';
import CreateAccountForm from '../../UI/SuperAdmin-UI/CreateAccountForm';

const CreateStaffPage = () => {
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
        <h1 className="text-2xl font-bold text-gold mb-6">Create New Staff or Admin</h1>

        {/* 🧾 Render Create Staff Form */}
        <CreateAccountForm />
      </div>
    </div>
  );
};

export default CreateStaffPage;

/*
📝 CreateStaffPage.jsx Summary

✅ Renders SuperAdmin sidebar and universal header
✅ Uses CreateStaffForm component to handle new staff/admin creation
✅ Mounted via route: /superadmin/create-staff
✅ Part of SuperAdmin dashboard routes
*/
