import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';


// Layout
import LayoutWithNav from './components/UI/Universal-UI/LayoutWithNavBar';

// Auth Protection
import { RequireAuth, RequireClient, RequireStaff, RequireAdmin } from './Routes/RequireAuth';

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
import SuperDashBoard from './components/pages/SuperAdminPages/SuperDashBoard';

// SuperAdmin Pages
import SuperAdmin from './components/pages/SuperAdminPages/SuperAdmin';


// AuthContext for splash screen readiness
function App() {
  const { isAppReady } = useAuth();

  useEffect(() => {
    if (isAppReady) {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.remove(); // 👈 boom. gone.
    }
  }, [isAppReady]);


    const { loading, isGuest, isStaff, isSuperAdmin } = useAuth();

    useEffect(() => {
      const preloader = document.getElementById('preloader');

      // ✅ Only remove preloader when Firebase Auth has loaded
      if (!loading && preloader) {
        if (isGuest) {
          // 🧼 Remove preloader for guests (first-time users)
          preloader.remove();
        } else {
          // ⚡ Instantly skip preloader for logged-in users
          preloader.remove();
        }
      }
    }, [loading, isGuest, isStaff, isSuperAdmin]);

  // ✅ Firebase config check (can be removed later)

  return (
    <>
      <LayoutWithNav>
        <Routes>

          {/* Universal Welcome Page */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Super/DashTry" element={<SuperDashBoard />} />
          {/* <Route path="/SuperAdmin/Dashboard" element={<SuperDashBoard />} /> */}

          {/* Guest/Anonymous Route */}
          <Route path="/guest/add-job" element={<AddJobPage />} />

          {/* Client Auth Routes */}
          <Route path="/client/login" element={<CTLPage />} />

          {/* Staff Auth Routes */}
          <Route path="/staff/login" element={<SLPage />} />

          {/* 🔐 Protected Staff Routes */}
          <Route element={<RequireStaff />}>
            <Route path="/staff/home" element={<Home />} />
            <Route path="/staff/dashboard" element={<SDashboard />} />
          </Route>

          {/* 🔐 Protected Client Routes */}
          <Route element={<RequireClient />}>
            <Route path="/client/job-card" element={<CTJobCard />} />
            <Route path="/client/dashboard" element={<CTJobList />} />
            <Route path="/client/add-job" element={<AddJobPage />} />
            <Route path="/client/joblist" element={<CTJobList />} />
            <Route path="/client/job/:id/details" element={<JobDetailsPage />} />
          </Route>

          {/* 🔐 Protected SuperAdmin Routes */}
          <Route element={<RequireAdmin />}>
              <Route path="/SuperAdmin" element={<SuperAdmin />}>
                <Route index element={<SuperDashBoard />} /> {/* /SuperAdmin */}
                <Route path="Dashboard" element={<SuperDashBoard />} /> {/* /SuperAdmin/Dashboard */}
                {/* <Route path="create-staff" element={<CreateStaff />} /> */}
              </Route>
            </Route>
        </Routes>
      </LayoutWithNav>
    </>
  );
}

export default App;


// 🧭 App.jsx – Root Application Shell
//
// ✅ Defines all core routes and layout structure using React Router
// ✅ Wraps app with a shared navigation layout (LayoutWithNav)
// ✅ Implements route protection using role-based guards (RequireAuth, RequireStaff, etc.)
// ✅ Uses AuthContext's `isAppReady` to control preloader splash
// ✅ The first useEffect removes the preloader once the app is logically "ready".
// ✅ The second useEffect removes the preloader specifically based on Firebase Auth state and role.
//    → Prevents rendering before Firebase Auth + Role resolution completes
//
// 📦 Pages included:
//    - Universal: WelcomePage, AddJob, JobDetails, Home
//    - Client: Login, Dashboard, JobList, AddJob
//    - Staff: Login, Dashboard
//    - SuperAdmin: Dashboard

