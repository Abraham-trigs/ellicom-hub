import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// Protects routes for authenticated users only
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/Login" replace />;
};

export default RequireAuth;
