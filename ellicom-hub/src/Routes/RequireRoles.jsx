import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthenticStore from '../components/store/AuthenticStore';

/**
 * 🔐 RequireRole – Role-based route protection
 *
 * @param {ReactNode} children - Protected route component
 * @param {string[]} allowedRoles - Roles that can access this route
 *
 * 🧠 Uses Zustand's `useAuthenticStore()` for:
 *   - user (Firebase user object)
 *   - role (superadmin, staff, client, etc.)
 *   - loading (auth still resolving)
 *   - fetchUser() – refetch user info if needed
 *
 * 🌍 Usage:
 * <Route element={<RequireRole allowedRoles={['superadmin']} />} />
 * <Route element={<RequireRole allowedRoles={['staff', 'admin']} />} />
 */
const RequireRole = ({ children, allowedRoles }) => {
  const { user, role, loading, fetchUser } = useAuthenticStore();

  // ⏳ Fetch user if not yet loaded
  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  // 🌀 Still loading? Show splash or loader
  if (loading) return <p>Loading...</p>;

  // ❌ Block access if role is not allowed
  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized – render route
  return children;
};

export default RequireRole;
