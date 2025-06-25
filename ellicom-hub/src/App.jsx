import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// 🧠 Zustand Auth Store (not Context anymore)
import useAuthenticStore from './components/store/AuthenticStore';

// Layout
import LayoutWithNav from './components/UI/Universal-UI/LayoutWithNavBar';

// Auth Protection (updated guards using Zustand)
import RequireClient from './Routes/RequireClient';
import RequireStaff from './Routes/RequireStaff';
import RequireSuperAdmin from './Routes/RequireSuperAdmin';

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
  const { isAppReady, loading, isGuest, fetchUser } = useAuthenticStore();

  // ✅ Initial fetch for auth state
  useEffect(() => {
    fetchUser(); // ensure auth is fetched on mount
  }, []);

  // ✅ Remove splash screen when ready
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (isAppReady && preloader) preloader.remove();
  }, [isAppReady]);

  // ✅ Extra fallback in case appReady fails (based on loading)
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (!loading && preloader) preloader.remove();
  }, [loading]);

  return (
    <LayoutWithNav>
      <Routes>

        {/* 🌐 Public Universal Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/guest/add-job" element={<AddJobPage />} />

        {/* 🔐 Client Auth */}
        <Route path="/client/login" element={<CTLPage />} />
        <Route element={<RequireClient />}>
          <Route path="/client/job-card" element={<CTJobCard />} />
          <Route path="/client/dashboard" element={<CTJobList />} />
          <Route path="/client/add-job" element={<AddJobPage />} />
          <Route path="/client/joblist" element={<CTJobList />} />
          <Route path="/client/job/:id/details" element={<JobDetailsPage />} />
        </Route>

        {/* 🔐 Staff Auth */}
        <Route path="/staff/login" element={<SLPage />} />
        <Route element={<RequireStaff />}>
          <Route path="/staff/home" element={<Home />} />
          <Route path="/staff/dashboard" element={<SDashboard />} />
        </Route>

        {/* 🛡️ Super Admin Protected */}
        <Route element={<RequireSuperAdmin />}>
          <Route path="/superadmin" element={<SuperAdmin />}>
            <Route index element={<SuperDashBoard />} />
            <Route path="dashboard" element={<SuperDashBoard />} />
            {/* Future: <Route path="create-staff" element={<CreateStaff />} /> */}
          </Route>
        </Route>
        
      </Routes>
    </LayoutWithNav>
  );
}

export default App;


// 🧭 App.jsx – Root Application Shell (Zustand Version)
//
//Centralized route definitions using React Router
// Global layout (LayoutWithNav) wraps the entire app
//Auth handled by Zustand-based useAuthStore() instead of Context
//Preloader removed via isAppReady + fallback useEffect
//
// 🔐 Route Guards:
//    - RequireClient
//    - RequireStaff
//    - RequireSuperAdmin (replaces RequireAdmin)
//
// 📦 Pages Included:
//    - Universal: WelcomePage, AddJobPage, JobDetailsPage, Home
//    - Client: Login, Dashboard, JobCard, AddJob
//    - Staff: Login, Dashboard
//    - SuperAdmin: Dashboard (nested)
//
// 🧠 Zustand-powered auth allows cleaner guards, centralized logic,
//    and avoids the overhead of React Context.
