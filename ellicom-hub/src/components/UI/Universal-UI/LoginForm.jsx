// src/UI/Staff-UI/SLForm.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';

const LoginForm = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    login,
    loading,
    error,
  } = useUserStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(navigate);
    if (!success) {
      console.warn('❌ Login failed or invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-2xl shadow-lg space-y-6"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border-b-2 text-center border-inactive text-head focus:outline-none focus:ring-0 focus:border-gold"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border-b-2 text-center border-inactive text-head focus:outline-none focus:ring-0 focus:border-gold"
        />

        {error && (
          <p className="text-red-600 text-sm text-center italic">{error}</p>
        )}

        <div className="flex flex-col items-center justify-center mt-20">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center p-6 bg-sea hover:bg-high text-ground font-bold py-2 rounded-lg transition-all ease-in-out duration-200 -mt-6 focus:outline-none focus:ring-0"
          >
            {loading ? 'Signing in' : 'Enter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
