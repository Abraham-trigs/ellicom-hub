import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <LayoutWithNav>
      <Routes>

        {/* Universal Welcome Page */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Home" element={<Home />} />

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

      </Routes>
    </LayoutWithNav>
  );
}

export default App;
