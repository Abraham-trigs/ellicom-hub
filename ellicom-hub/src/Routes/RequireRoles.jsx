import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthenticStore from '../components/store/AuthenticStore';

/**
 * Reusable route guard that checks if the user's role is authorized.
 * 
 * @param {Array} allowedRoles - An array of allowed roles, e.g. ['staff', 'admin']
 * @param {String} redirectTo - Path to redirect unauthorized users to (default: '/')
 * @param {ReactNode} children - Protected content to render
 */
const RequireRole = ({ allowedRoles = [], redirectTo = '/', children }) => {
  const { user, role, loading, fetchUser } = useAuthenticStore();
  const location = useLocation();

  useEffect(() => {
    if (!user) fetchUser(); // ensures auth is fetched on refresh
  }, []);

  if (loading) return <p>Loading...</p>;

  const isAuthorized = user && allowedRoles.includes(role);

  return isAuthorized ? (
    children
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  );
};

export default RequireRole;


//
// RequireRole.jsx – Role-based route guard wrapper
//
// Role: Restricts access to child components based on current user's role
//
// Features:
//   - Accepts a `role` or array of roles (`["superadmin", "admin"]`)
//   - Checks authenticated user's role from Zustand or context
//   - Redirects unauthorized users to login or 403 page
//
// Notes:
//   - Replaces legacy RequireSuperAdmin logic
//   - Should wrap all routes and pages that need protection (e.g., SuperAdminDashboard, AdminPanel)
//   - Works best with central `useAuthStore()`
//   - Can be extended later for permissions like `canCreateJobs`, `canDeleteStaff`, etc.
//
// Author: Abraham Bortey Danfa
//
