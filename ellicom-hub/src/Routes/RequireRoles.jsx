// src/Routes/RequireRole.jsx

import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthenticStore from '../components/store/AuthenticStore';

/**
 * ✅ RequireRole – A route guard that restricts access based on user role.
 *
 * @param {Array|string} allowedRoles - Roles allowed to access the route
 * @param {string} redirectTo - Where to redirect unauthorized users
 *
 * Usage:
 * <Route
 *   element={<RequireRole allowedRoles={['admin', 'staff']} redirectTo="/unauthorized" />}
 * >
 *   <Route path="/staff/dashboard" element={<StaffDashboard />} />
 * </Route>
 */

const RequireRole = ({ allowedRoles = [], redirectTo = '/', children }) => {
  const {
    user,
    role,
    loading,
    isAppReady,
    initAuth, // ✅ Correct function to bootstrap auth state
  } = useAuthenticStore();

  const location = useLocation();

  useEffect(() => {
    // 🧠 Ensure role is loaded on initial mount (e.g., after refresh)
    if (!user) initAuth();
  }, [user, initAuth]);

  // ⏳ Show nothing while waiting for auth to resolve
  if (loading || !isAppReady) return null;

  // 🧠 Normalize single role string to array
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  // 🔐 Check authorization
  const isAuthorized = user && rolesArray.includes(role);

  return isAuthorized ? (
    children ? children : <Outlet />
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  );
};

export default RequireRole;
