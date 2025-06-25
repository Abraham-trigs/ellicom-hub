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


// 🧠 RequireRole –

// - ✅ Checks for user + role match
// - ✅ Accepts any role array (['client'], ['admin', 'superadmin'], etc.)
// - ✅ Redirects unauthorized users wherever you want (default: '/')
// - ✅ Uses Zustand store (not React Context)
// - ✅ Prevents race condition by fetching user if missing
// - ✅ Supports route memory via state (from: location)

// Perfect for:
// - Scalable apps with multi-role access control
// - Centralizing role logic
// - Reducing boilerplate and mistakes in route setup
