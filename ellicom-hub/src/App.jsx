import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import useUserStore from './components/store/UserStore';

import LayoutWithNav from './components/UI/Universal-UI/LayoutWithNavBar';

// Pages
import WelcomePage from './components/pages/UniversalPages/WelcomePage';
import AddJobPage from './components/pages/UniversalPages/AddJobPage';
import JobDetailsPage from './components/pages/UniversalPages/JobDetailsPage';
import Home from './components/pages/UniversalPages/Home';
import LoginPage from './components/pages/UniversalPages/LoginPage';

// Client
import CTJobCard from './components/UI/CLIENT-UI/CTJobCard';
import CTJobList from './components/pages/ClientPages/CTJobList';

// Staff
import SDashboard from './components/pages/StaffPages/SDashboard';

// admin


// SuperAdmin
import SuperDashBoard from './components/pages/SuperAdminPages/SuperDashBoard';
import CreateStaffPage from './components/pages/SuperAdminPages/CreateStaffPage';
import AccountListPage from './components/pages/SuperAdminPages/AccountListPage';

const ProtectedRoute = ({ allowedRoles }) => {
  const { role } = useUserStore();
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

function App() {
  const { isAppReady, loading, initUser } = useUserStore();

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if ((isAppReady || !loading) && preloader) preloader.remove();
  }, [isAppReady, loading]);

  return (
    <LayoutWithNav>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/guest/add-job" element={<AddJobPage />} />
        <Route path="/unauthorized" element={<div className="text-red-600 p-4">🚫 Access Denied</div>} />

        {/* 👤 Client Routes */}
        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route path="/client/home" element={<Home />} />
          <Route path="/client/dashboard" element={<CTJobList />} />
          <Route path="/client/job/:id/details" element={<JobDetailsPage />} />
          <Route path="/client/add-job" element={<AddJobPage />} />

        </Route>

        {/* 🧰 Staff Routes */}
        <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
          <Route path="/staff/home" element={<Home />} />
          <Route path="/staff/dashboard" element={<SDashboard />} />
          <Route path="/staff/add-job" element={<Home />} />

        </Route>
      
        {/* 🧰 Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<SDashboard />} />
          <Route path="/admin/add-job" element={<AddJobPage />} />

        </Route>


        {/* 🛡 SuperAdmin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
          <Route path="/superadmin/dashboard" element={<SuperDashBoard />} />
          <Route path="/superadmin/create-staff" element={<CreateStaffPage />} />
          <Route path="/superadmin/accounts" element={<AccountListPage />} />
          <Route path="/superadmin/add-job" element={<AddJobPage />} />
        </Route>

        {/* 🏚 Fallback */}
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutWithNav>
  );
}

export default App;
