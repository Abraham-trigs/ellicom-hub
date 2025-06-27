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
    initAuth, 
  } = useAuthenticStore();

  const location = useLocation();

  useEffect(() => {
    // 🧠 Ensure role is loaded on initial mount (e.g., after refresh)
    if (!user) initAuth();
  }, [user, initAuth]);

  // ⏳ Show nothing while waiting for auth to resolve
  if (loading || !isAppReady) return null;

  // 🔄 Normalize role strings to prevent casing mismatches
  const normalizedRole = role?.toLowerCase();
  const rolesArray = (Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]).map(r => r.toLowerCase());

  // 🔐 Check authorization
  const isAuthorized = user && rolesArray.includes(normalizedRole);

  return isAuthorized ? (
    children ? children : <Outlet />
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  );
};

export default RequireRole;

/*
📄 File: RequireRole.jsx

🧠 Purpose:
- Protects route access based on Firebase user roles (e.g., staff, admin, superadmin)

⚠️ Fixes:
- Added lowercase normalization to role checks to prevent mismatches like 'SuperAdmin' vs 'superadmin'

🔐 Handles:
- App boot logic via initAuth()
- Null UI during loading
- Dynamic nested routing with <Outlet />

✅ Matches Firebase Auth + Firestore role structure conventions
*/
