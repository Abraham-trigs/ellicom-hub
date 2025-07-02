// src/App.jsx – Main Application Shell (Refactored with Unified Auth Store)

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import useUserStore from './components/store/UserStore';
// Layout
import LayoutWithNav from './components/UI/Universal-UI/LayoutWithNavBar';

// Universal Pages
import WelcomePage from './components/pages/UniversalPages/WelcomePage';
import AddJobPage from './components/pages/UniversalPages/AddJobPage';
import JobDetailsPage from './components/pages/UniversalPages/JobDetailsPage';
import Home from './components/pages/UniversalPages/Home';

// Client Pages
import CTLPage from './components/pages/ClientPages/CTLPage';
import CTJobCard from './components/UI/CLIENT-UI/CTJobCard';
import CTJobList from './components/pages/ClientPages/CTJobList';

// Staff Pages
import SLPage from './components/pages/StaffPages/SLPage';
import SDashboard from './components/pages/StaffPages/SDashboard';

// SuperAdmin Pages
import SuperDashBoard from './components/pages/SuperAdminPages/SuperDashBoard';
import SuperAdmin from './components/pages/SuperAdminPages/SuperAdmin';
import CreateStaffPage from './components/pages/SuperAdminPages/CreateStaffPage';

function App() {
  const { isAppReady, loading, initUser, role } = useUserStore();

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
        <Route path="/home" element={<Home />} />
        <Route path="/guest/add-job" element={<AddJobPage />} />
        <Route path="/unauthorized" element={<div className="text-red-600 p-4">🚫 Access Denied</div>} />

        {/* 👤 Client Auth */}
        <Route path="/client/login" element={<CTLPage />} />
        <Route
          path="/client/*"
          element={role === 'client' ? (
            <Routes>
              <Route path="dashboard" element={<CTJobList />} />
              <Route path="job-card" element={<CTJobCard />} />
              <Route path="add-job" element={<AddJobPage />} />
              <Route path="joblist" element={<CTJobList />} />
              <Route path="job/:id/details" element={<JobDetailsPage />} />
            </Routes>
          ) : (
            <Navigate to="/client/login" />
          )}
        />

        {/* 🧰 Staff Auth */}
        <Route path="/staff/login" element={<SLPage />} />
        <Route
          path="/staff/*"
          element={['staff', 'admin'].includes(role) ? (
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="dashboard" element={<SDashboard />} />
            </Routes>
          ) : (
            <Navigate to="/staff/login" />
          )}
        />

        {/* 🛡 SuperAdmin Auth */}
        <Route
          path="/superadmin/*"
          element={role === 'superadmin' ? (
            <Routes>
              <Route index element={<SuperDashBoard />} />
              <Route path="dashboard" element={<SuperDashBoard />} />
              <Route path="create-staff" element={<CreateStaffPage />} />
            </Routes>
          ) : (
            <Navigate to="/unauthorized" />
          )}
        />
      </Routes>
    </LayoutWithNav>
  );
}

export default App;
