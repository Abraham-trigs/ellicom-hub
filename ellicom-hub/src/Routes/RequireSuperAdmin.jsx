import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// Only superadmins can access this route
const RequireSuperAdmin = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/Login" replace />;
  if (role !== 'superadmin') return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RequireSuperAdmin;
