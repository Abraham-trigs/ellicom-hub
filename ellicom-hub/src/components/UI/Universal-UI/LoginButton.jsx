// src/components/Universal-UI/LoginButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  };

  return (
    <button
      onClick={handleClick}
      className="hover:bg-darkSea hover:text-coHead hover:border-coHead font-medium text-gold px-5 py-2 border-1 border-high rounded-md w-20 h-12"
    >
      Login
    </button>
  );
};

export default LoginButton;
