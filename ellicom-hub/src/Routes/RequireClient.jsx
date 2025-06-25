// src/Routes/RequireClient.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const RequireClient = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || role !== 'client') {
    return <Navigate to="/client/login" replace />;
  }

  return children;
};

export default RequireClient;

/**
 * 🔐 RequireClient – Protects client-only routes
 * ------------------------------------------------
 * ✅ Allows access only if:
 *    - User is logged in
 *    - User's role is 'client'
 *
 * 🚫 Redirects:
 *    - To '/client/login' if not logged in or role isn't 'client'
 */

