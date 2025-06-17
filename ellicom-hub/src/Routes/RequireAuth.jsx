import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrapper for general auth
export const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/" replace />;
};

// Wrapper for Clients only
export const RequireClient = ({ children }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user && role === 'client' ? children : <Navigate to="/client/login" replace />;
};

// Wrapper for Staff only
export const RequireStaff = ({ children }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user && role === 'staff' ? children : <Navigate to="/staff/login" replace />;
};

// Wrapper for Admin/Superadmin
export const RequireAdmin = ({ children }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user && (role === 'admin' || role === 'superadmin')
    ? children
    : <Navigate to="/" replace />;
};
