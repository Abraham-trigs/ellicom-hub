import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthenticStore from '../components/store/AuthenticStore';

/**
 * ✅ RequireRole – A route guard that restricts access based on user role.
 *
 * @param {Array|string} allowedRoles - One or more roles allowed to access the route
 * @param {string} redirectTo - Path to redirect unauthorized users (default: "/")
 *
 * Example usage:
 * <Route
 *   element={<RequireRole allowedRoles={['admin', 'staff']} redirectTo="/unauthorized" />}
 * >
 *   <Route path="/staff/dashboard" element={<StaffDashboard />} />
 * </Route>
 */
const RequireRole = ({ allowedRoles = [], redirectTo = '/', children }) => {
  const { user, role, loading, isAppReady, fetchUser } = useAuthenticStore();
  const location = useLocation();

  useEffect(() => {
    // 🧠 Ensure role is fetched on initial load (especially after refresh)
    if (!user) fetchUser();
  }, []);

  // ⏳ While loading auth state, show nothing or a loader
  if (loading || !isAppReady) return null;

  // 🎯 Normalize allowedRoles to array if it's a single string
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  // 🔐 Check if user is logged in and role matches
  const isAuthorized = user && rolesArray.includes(role);

  // ✅ Authorized → render children or nested routes
  if (isAuthorized) {
    return children ? children : <Outlet />;
  }

  // ❌ Not authorized → redirect and preserve attempted path
  return <Navigate to={redirectTo} replace state={{ from: location }} />;
};

export default RequireRole;



//
// RequireRole.jsx – Role-based route guard wrapper for protected routes
//
// 🔐 Purpose:
//   - Restrict access to specific routes based on user's role (e.g., 'staff', 'admin')
//   - Redirects unauthorized users to login or fallback page
//
// ⚙️ Parameters:
//   - allowedRoles (string | array): Accepts a role or an array of roles
//   - redirectTo (string): Path to redirect unauthorized users (default is "/")
//
// 🧠 Behavior:
//   - Pulls current user and role from Zustand `useAuthenticStore`
//   - Triggers `fetchUser()` if user is null (like on refresh)
//   - Uses `Outlet` if no children are passed (ideal for wrapping <Route> groups)
//
// 🛠️ Example Usage:
//   <Route element={<RequireRole allowedRoles={['superadmin']} redirectTo="/unauthorized" />}>
//     <Route path="/superadmin/dashboard" element={<SuperDash />} />
//   </Route>
//
// 👤 Auth Integration:
//   - Depends on Zustan
