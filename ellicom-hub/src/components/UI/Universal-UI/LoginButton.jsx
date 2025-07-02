// src/components/Universal-UI/LoginButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';

const LoginButton = () => {
  const { role, email, password, error } = useUserStore();
  const navigate = useNavigate();

  const getPath = () => {
    switch (role?.toLowerCase()) {
      case 'client':
        return '/client/login';
      case 'staff':
        return '/staff/login';
      case 'admin':
        return '/staff/login';
      case 'superadmin':
        return '/superadmin';
      default:
        return null;
    }
  };

  const handleClick = () => {
    const path = getPath();
    if (!email || !password) {
      alert('⚠️ Please fill in both email and password.');
    } else if (path) {
      navigate(path);
    } else {
      alert('⚠️ Invalid credentials. No account matches the provided email and password.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="hover:bg-darkSea hover:text-coHead hover:border-coHead font-medium text-gold px-5 py-2 border-1 border-high rounded-md w-20 h-12"
    >
      {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : 'Login'}
    </button>
  );
};

export default LoginButton;
