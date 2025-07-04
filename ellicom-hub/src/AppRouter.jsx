import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useUserStore from './store/UserStore';
import getJobRouteForRole from './utils/roleRoutes';

// 🧱 Pages
import AddJobPage from './pages/AddJobPage';
import JobDetails from './pages/JobDetails';
import Unauthorized from './pages/Unauthorized';
import LoginPage from './pages/LoginPage'; // Placeholder

const AppRouter = () => {
  const { role, user, loading } = useUserStore();

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  // 🧭 Map role to route paths
  const addJobRoute = getJobRouteForRole(role);
  const jobDetailsRoute = addJobRoute.replace('add-job', 'job-details/:id');

  return (
    <Router>
      <Routes>
        {/* Role-based Add Job */}
        <Route path={addJobRoute} element={<AddJobPage />} />

        {/* Role-based Job Details (dynamic ID) */}
        <Route path={jobDetailsRoute} element={<JobDetails />} />

        {/* Essentials */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to={addJobRoute} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
