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
        <Route element={<RequireRole allowedRoles={['client']} />}>
          <Route path="/client/job-card" element={<CTJobCard />} />
          <Route path="/client/dashboard" element={<CTJobList />} />
          <Route path="/client/add-job" element={<AddJobPage />} />
          <Route path="/client/joblist" element={<CTJobList />} />
          <Route path="/client/job/:id/details" element={<JobDetailsPage />} />
        </Route>

        {/* 🧰 Staff Auth */}
        <Route path="/staff/login" element={<SLPage />} />
        <Route element={<RequireRole allowedRoles={['staff', 'admin']} />}>
          <Route path="/staff/home" element={<Home />} />
          <Route path="/staff/dashboard" element={<SDashboard />} />
        </Route>

        {/* 🛡 SuperAdmin Auth */}
        <Route element={<RequireRole allowedRoles={['superadmin']} />}>
          <Route path="/superadmin" element={<SuperAdmin />}>
            <Route index element={<SuperDashBoard />} />
            <Route path="dashboard" element={<SuperDashBoard />} />
            {/* <Route path="create-staff" element={<CreateStaff />} /> */}
          </Route>
        </Route>

      </Routes>
    </LayoutWithNav>
  );
}

export default App;


// 🧭 App.jsx – Root Shell with Zustand + Reusable Role-Based Guards

// ✅ Uses Zustand (not Context) via useAuthenticStore
// ✅ Replaces all individual guards with a single RequireRole component
// ✅ Protects routes by role in a centralized, DRY way
// ✅ Handles preloader splash via isAppReady and fallback
// ✅ Supports nested routing (e.g., /superadmin/dashboard)

// ✨ Clean, scalable, and 🔥 ready for anything enterprise-level.
