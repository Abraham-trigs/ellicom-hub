import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthenticStore from '../store/AuthenticStore';

export const RequireAdmin = ({ children }) => {
  const { user, role, loading, fetchUser } = useAuthenticStore();

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return user && (role === 'admin' || role === 'superadmin')
    ? children
    : <Navigate to="/" replace />;
};
