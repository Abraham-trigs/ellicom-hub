import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutWithNav from './components/UI/LayoutWithNavBar';
import WelcomePage from './components/pages/WelcomePage';
import CTLPage from './components/pages/ClientPages/CTLPage';
import SLPage from './components/pages/StaffPages/SLPage';
import Home from './components/pages/StaffPages/Home';
import SDashboard from './components/pages/StaffPages/SDashboard';
import CTJobCard from './components/UI/CLIENT-UI/CTJobCard';
import AddJobPage from './components/pages/AddJobPage';
import JobDetailsPage from './components/pages/JobDetailsPage';
import CTJobList from './components/pages/ClientPages/CTJobList';

function App() {
  return (
    <LayoutWithNav>
      <Routes>

        {/* Universal Welcome Page */}
        <Route path="/" element={<WelcomePage />} />

        {/* Guest */}
        <Route path="/guest/add-job" element={<AddJobPage />} />

        {/* Staff */}
        <Route path="/staff/login" element={<SLPage />} />
        <Route path="/staff/home" element={<Home />} />
        <Route path="/staff/dashboard" element={<SDashboard />} />

        {/* Client */}
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
