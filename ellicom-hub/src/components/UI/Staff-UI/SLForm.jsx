// UI/Staff-UI/SLForm.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../store/LoginStore';

const SLForm = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    login,
    setLoginType,
    loading,
    error,
  } = useLoginStore();

  const navigate = useNavigate();

  useEffect(() => {
    // 🎯 Ensure we're in staff login mode
    setLoginType('staff');
  }, [setLoginType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(navigate);
    // Redirecting is handled inside login() already based on role
  };

  return (
    <div className="flex items-center justify-center px-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-2xl shadow-lg space-y-6"
      >
        <div>
          <input
            type="email"
            placeholder="Staff Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border-b-2 text-center border-inactive text-head focus:outline-none focus:ring-0 focus:border-gold"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border-b-2 text-center border-inactive text-head focus:outline-none focus:ring-0 focus:border-gold"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center italic">{error}</p>
        )}

        <div className="flex flex-col items-center justify-center mt-20">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center p-6 bg-sea hover:bg-high text-ground font-bold py-2 rounded-lg transition-all ease-in-out duration-200 -mt-6 focus:outline-none focus:ring-0"
          >
            {loading ? 'Loading...' : 'Enter'}
          </button>
        </div>    
      </form>
    </div>
  );
};

export default SLForm;


//
// SLForm.jsx – Staff Login Form (connected to Zustand useLoginStore)
//
// 🔐 Purpose:
//   - Renders staff email/password login form
//   - Uses shared useLoginStore for logic and state
//
// 🧠 Zustand Sync:
//   - email, password → from useLoginStore
//   - loginType → set to "staff" via useEffect()
//   - login() handles auth + redirect
//
// 💡 Features:
//   - Auto disables button while logging in
//   - Displays error messages if Firebase login fails
//   - Uses useNavigate() for redirection (also triggered inside login())
//
