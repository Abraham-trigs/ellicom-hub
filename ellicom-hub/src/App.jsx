import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// 🔐 Role-based guard (Zustand powered)
import RequireRole from './Routes/RequireRoles';
import useAuthenticStore from './components/store/AuthenticStore';

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

  // 🔄 Load user on app mount
  useEffect(() => {
    fetchUser();
  }, []);

  // 🧼 Remove preloader when app is ready
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (isAppReady && preloader) preloader.remove();
  }, [isAppReady]);

  // 🧯 Fallback if isAppReady fails
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

        {/* 🧾 Client Auth */}
        <Route path="/client/login" element={<CTLPage />} />
        <Route
          element={
            <RequireRole
              allowedRoles={['client']}
              redirectTo="/client/login"
            />
          }
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
          element={
            <RequireRole
              allowedRoles={['staff', 'admin']}
              redirectTo="/staff/login"
            />
          }
        >
          <Route path="/staff/home" element={<Home />} />
          <Route path="/staff/dashboard" element={<SDashboard />} />
        </Route>

        {/* 🛡 SuperAdmin Auth */}
        <Route
          element={
            <RequireRole
              allowedRoles={['superadmin']}
              redirectTo="/unauthorized"
            />
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
// App.jsx – Main Application Shell (Zustand + Role-Based Access)
//
// 📦 State & Auth:
//   - Powered by Zustand's `useAuthenticStore`
//   - Fetches Firebase user + role on mount (via fetchUser())
//   - Centralizes isAppReady, user, role, and loading flags
//
// 🧼 Splash Screen Handling:
//   - Removes #preloader once `isAppReady` is true
//   - Includes fallback removal when `loading` becomes false
//
// 🛡️ Route Guards:
//   - Single reusable <RequireRole allowedRoles={[]} /> for all protected sections
//   - Replaces old guard components like RequireClient / RequireAdmin
//
