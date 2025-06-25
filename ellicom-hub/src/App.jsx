// App.jsx – Main Application Shell (Zustand + Role-Based Access)

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Zustand Stores
import useAuthenticStore from './components/store/AuthenticStore';
import useUserStore from './components/store/UserStore';

// Role Guard
import RequireRole from './Routes/RequireRoles';

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

function App() {
  const { isAppReady, loading, fetchUser } = useAuthenticStore();
  const { fetchUserAndRole } = useUserStore();

  // 🔄 Load auth + Firestore user data on mount
  useEffect(() => {
    fetchUser();
    fetchUserAndRole();
  }, []);

  // 🧼 Remove splash/preloader once app is ready
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (isAppReady && preloader) preloader.remove();
  }, [isAppReady]);

  // 🧯 Fallback in case isAppReady is skipped
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

        {/* 👤 Client Auth */}
        <Route path="/client/login" element={<CTLPage />} />
        <Route
          element={<RequireRole allowedRoles="client" redirectTo="/client/login" />}
        >
          <Route path="/client/job-card" element={<CTJobCard />} />
          <Route path="/client/dashboard" element={<CTJobList />} />
          <Route path="/client/add-job" element={<AddJobPage />} />
          <Route path="/client/joblist" element={<CTJobList />} />
          <Route path="/client/job/:id/details" element={<JobDetailsPage />} />
        </Route>

        {/* 🧰 Staff Auth */}
        <Route path="/staff/login" element={<SLPage />} />
        <Route
          element={<RequireRole allowedRoles={['staff', 'admin']} redirectTo="/staff/login" />}
        >
          <Route path="/staff/home" element={<Home />} />
          <Route path="/staff/dashboard" element={<SDashboard />} />
        </Route>

        {/* 🛡 SuperAdmin Auth */}
        <Route
          element={<RequireRole allowedRoles="superadmin" redirectTo="/unauthorized" />}
        >
          <Route path="/superadmin" element={<SuperAdmin />}>
            <Route index element={<SuperDashBoard />} />
            <Route path="dashboard" element={<SuperDashBoard />} />
          </Route>
        </Route>

      </Routes>
    </LayoutWithNav>
  );
}

export default App;


//
// App.jsx – Main Application Shell (Zustand + Role-Based Access)
//
// 🧬 Auth Integration:
//   - Uses `useAuthenticStore` for Firebase auth + custom claims
//   - Uses `useUserStore` to fetch Firestore-stored user data
//
// 🛡 Role-Based Protection:
//   - Uses new `RequireRole` wrapper with `Outlet` for secure nested routing
//   - Allows passing string or array to `allowedRoles` prop
//
// 🚀 Boot Logic:
//   - Automatically fetches role + auth user on mount
//   - Handles preloader cleanup gracefully using isAppReady or loading
//
// 🧭 Routes Covered:
//   - Public: Welcome, Home, Guest Add Job
//   - Client: Login + Dashboard + JobViews
//   - Staff/Admin: Login + Home + Dashboard
//   - SuperAdmin: Nested dashboard pages
//
// 🧱 Design:
//   - Modular, readable and scalable for permission-based expansion
//
