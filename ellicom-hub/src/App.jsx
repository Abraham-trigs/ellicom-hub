// src/App.jsx – Login Routes Removed

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import useUserStore from './components/store/UserStore';
// Layout
import LayoutWithNav from './components/UI/Universal-UI/LayoutWithNavBar';

// Universal Pages
import WelcomePage from './components/pages/UniversalPages/WelcomePage';
import AddJobPage from './components/pages/UniversalPages/AddJobPage';
import JobDetailsPage from './components/pages/UniversalPages/JobDetailsPage';
import Home from './components/pages/UniversalPages/Home';
import LoginPage from './components/pages/UniversalPages/LoginPage';

// Client Pages
import CTJobCard from './components/UI/CLIENT-UI/CTJobCard';
import CTJobList from './components/pages/ClientPages/CTJobList';

// Staff Pages
import SDashboard from './components/pages/StaffPages/SDashboard';

// SuperAdmin Pages
import SuperDashBoard from './components/pages/SuperAdminPages/SuperDashBoard';
import CreateStaffPage from './components/pages/SuperAdminPages/CreateStaffPage';

function App() {
  const { isAppReady, loading, initUser } = useUserStore();

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (isAppReady && preloader) preloader.remove();
  }, [isAppReady]);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (!loading && preloader) preloader.remove();
  }, [loading]);

  return (
    <LayoutWithNav>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/guest/add-job" element={<AddJobPage />} />
        <Route path="/unauthorized" element={<div className="text-red-600 p-4">🚫 Access Denied</div>} />

        {/* 👤 Client Pages */}
        <Route path="/client/dashboard" element={<CTJobList />} />
        <Route path="/client/job-card" element={<CTJobCard />} />
        <Route path="/client/add-job" element={<AddJobPage />} />
        <Route path="/client/joblist" element={<CTJobList />} />
        <Route path="/client/job/:id/details" element={<JobDetailsPage />} />

        {/* 🧰 Staff Pages */}
        <Route path="/staff/home" element={<Home />} />
        <Route path="/staff/dashboard" element={<SDashboard />} />

        {/* 🛡 SuperAdmin Pages */}
        <Route path="/superadmin/dashboard" element={<SuperDashBoard />} />
        <Route path="/superadmin/create-staff" element={<CreateStaffPage />} />
      </Routes>
    </LayoutWithNav>
  );
}

export default App;
