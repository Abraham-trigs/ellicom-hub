// App.jsx – Main Application Shell (Zustand + Role-Based Access)

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// 🧠 Zustand Stores
import useAuthenticStore from './components/store/AuthenticStore';
import useUserStore from './components/store/UserStore'; // ✅ Firestore sync

// 🔐 Role-based route guard
import RequireRole from './Routes/RequireRoles';

// 🧱 Layout Shell
import LayoutWithNav from './components/UI/Universal-UI/LayoutWithNavBar';

// 🌐 Universal Pages
import WelcomePage from './components/pages/UniversalPages/WelcomePage';
import AddJobPage from './components/pages/UniversalPages/AddJobPage';
import JobDetailsPage from './components/pages/UniversalPages/JobDetailsPage';
import Home from './components/pages/UniversalPages/Home';

// 👤 Client Pages
import CTLPage from './components/pages/ClientPages/CTLPage';
import CTJobCard from './components/UI/CLIENT-UI/CTJobCard';
import CTJobList from './components/pages/ClientPages/CTJobList';

// 🧰 Staff Pages
import SLPage from './components/pages/StaffPages/SLPage';
import SDashboard from './components/pages/StaffPages/SDashboard';

// 🛡 SuperAdmin Pages
import SuperDashBoard from './components/pages/SuperAdminPages/SuperDashBoard';
import SuperAdmin from './components/pages/SuperAdminPages/SuperAdmin';

function App() {
  const { isAppReady, loading, fetchUser, profile } = useAuthenticStore(); // ✅ Now includes `profile`
  const { fetchUserAndRole } = useUserStore(); // ✅ Firestore extended info

  // 🔄 Load user + role from Firebase and Firestore on mount
  useEffect(() => {
    fetchUser();             // 🔐 Pulls Firebase user + claims + role + Firestore fallback
    fetchUserAndRole();      // 🧬 Pulls extended user details like phone, photo, dept
  }, []);

  // 🧼 Preloader removal when app is ready
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (isAppReady && preloader) preloader.remove();
  }, [isAppReady]);

  // 🔁 Backup: Preloader removal in case isAppReady missed
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

        {/* 👤 Client Auth Routes */}
        <Route path="/client/login" element={<CTLPage />} />
        <Route
          element={
            <RequireRole allowedRoles={['client']} redirectTo="/client/login" />
          }
        >
          <Route path="/client/job-card" element={<CTJobCard />} />
          <Route path="/client/dashboard" element={<CTJobList />} />
          <Route path="/client/add-job" element={<AddJobPage />} />
          <Route path="/client/joblist" element={<CTJobList />} />
          <Route path="/client/job/:id/details" element={<JobDetailsPage />} />
        </Route>

        {/* 🧰 Staff Auth Routes */}
        <Route path="/staff/login" element={<SLPage />} />
        <Route
          element={
            <RequireRole allowedRoles={['staff', 'admin']} redirectTo="/staff/login" />
          }
        >
          <Route path="/staff/home" element={<Home />} />
          <Route path="/staff/dashboard" element={<SDashboard />} />
        </Route>

        {/* 🛡 SuperAdmin Auth Routes */}
        <Route
          element={
            <RequireRole allowedRoles={['superadmin']} redirectTo="/unauthorized" />
          }
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
// App.jsx – Central Role-Guided Shell for Ellicom-Hub
//
// 🧠 State Architecture:
//   - `useAuthenticStore`: Handles Firebase Auth, claims, roles, and now `profile` (photoURL, name, email, etc.)
//   - `useUserStore`: Enhances role data with Firestore fallback and detail syncing
//
// 🛡️ Route Protection:
//   - Uses `<RequireRole />` wrapper for clients, staff/admins, and superadmins
//   - Ensures deep control over unauthorized page access
//
// 🧼 Splash/Preloader Logic:
//   - Preloader is hidden once app knows user + role (via isAppReady)
//   - Fallback included in case `isAppReady` skips (e.g., fast login)
//
// 🌐 Route Map:
//   - Public: welcome, home, add job (guest)
//   - Client: dashboard, job list/card/details (must be 'client')
//   - Staff/Admin: dashboard, home (must be 'staff' or 'admin')
//   - SuperAdmin: dashboard inside nested outlet (must be 'superadmin')
//
