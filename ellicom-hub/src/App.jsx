import { Routes, Route } from 'react-router-dom';

// Layout
import LayoutWithNav from './components/UI/LayoutWithNavBar';

// Universal Pages
import WelcomePage from './components/pages/WelcomePage';
import AddJobPage from './components/pages/AddJobPage';
import JobDetailsPage from './components/pages/JobDetailsPage';

// Client Pages
import CTLPage from './components/pages/ClientPages/CTLPage';
import CTJobCard from './components/UI/CLIENT-UI/CTJobCard';
import CTJobList from './components/pages/ClientPages/CTJobList';

// Staff Pages
import SLPage from './components/pages/StaffPages/SLPage';
import Home from './components/pages/StaffPages/Home';
import SDashboard from './components/pages/StaffPages/SDashboard';

function App() {
  return (
    
    <LayoutWithNav>
      <Routes>

        {/* Universal Welcome Page */}
        <Route path="/" element={<WelcomePage />} />

        {/* Guest Route */}
        <Route path="/guest/add-job" element={<AddJobPage />} />

        {/* Staff Routes */}
        <Route path="/staff/login" element={<SLPage />} />
        <Route path="/staff/home" element={<Home />} />
        <Route path="/staff/dashboard" element={<SDashboard />} />

        {/* Client Routes */}
        <Route path="/client/login" element={<CTLPage />} />
        <Route path="/client/job-card" element={<CTJobCard />} />
        <Route path="/client/dashboard" element={<CTJobList />} />
        <Route path="/client/add-job" element={<AddJobPage />} />
        <Route path="/client/joblist" element={<CTJobList />} />
        <Route path="/client/job/:id/details" element={<JobDetailsPage />} />

      </Routes>
    </LayoutWithNav>
  );
}

export default App;
