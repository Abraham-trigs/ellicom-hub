import { useNavigate } from 'react-router-dom';
import React from 'react';

// UI Components
import Logo from '../../UI/Universal-UI/logo';
import ClientLoginButton from '../../UI/CLIENT-UI/CTLoginButton';
import AvailableNow from '../../UI/Universal-UI/AvailableNow';

const WelcomePage = () => {
  const navigate = useNavigate();

  // Navigation to Client Login Page
  const ClientLogin = () => {
    navigate('/Client/login');
  };

  // Navigation to Staff/Admin Login Page
  const StaffLogin = () => {
    navigate('/Staff/login');
  };

  // Navigation to Guest Add Job Page
  const GuestAddJob = () => {
    navigate('/Guest/Add-Job');
  };

  return (
    <>
      {/* Welcome Text */}
      <div>
        <p className="text-gold font-normal italic text-center mt-10">
          Welcome to
        </p>
      </div>

      {/* Brand Title */}
      <div>
        <h1 className="text-gold font-black text-5xl text-center mt-2">
          ELLICOM
        </h1>
      </div>

      {/* Company Subtitle */}
      <div>
        <p className="text-head font-normal text-center ">
          Advertising Ghana Ltd
        </p>
      </div>

      {/* Logo Section */}
      <div className="flex items-center justify-center">
        <div className="px-4 py-9 w-40 md:w-60 lg:w-72 object-contain mb-0">
          <Logo />
        </div>
      </div>

      {/* Guest + Client Buttons */}
      <div className="">
        <div className="flex flex-row justify-evenly gap-0">
          <button
            className="hover:bg-darkSea bg-sea hover:text-coHead font-medium text-ground  px-3 py-3  border-neonSea rounded-md mb-5"
            onClick={GuestAddJob}
          >
            New Job+
          </button>

          <button
            className="hover:bg-darkSea bgz bg-gold hover:text-coHead font-medium text-ground  px-8 py-3  border-high rounded-md mb-5"
            onClick={ClientLogin}
          >
            Client
          </button>
        </div>
      </div>

      {/* Admin / Staff Login Button - Centered Horizontally */}
      <div onClick={StaffLogin} className="flex justify-center w-full">
        <button
          className="hover:bg-coHead  hover:text-ground font-medium text-coHead px-8 py-3 border-high rounded-md"
        >
          Admin / Staff
        </button>
      </div>

      {/* Availability Badge */}
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="-mb-12">
          <AvailableNow />
        </div>
      </div>

      {/* Footer Contact Text */}
      <div className="mt-17">
        <p className="text-gold text-[0.9rem] font-light text-center -mt-1">
          Contact Us
        </p>
      </div>
    </>
  );
};

export default WelcomePage;


//
// WelcomePage.jsx – Landing screen with entry paths for all user types
//
// Role: First interaction screen that routes users based on role or intent
//
// Features:
//   - Buttons for:
//       • Guest Add Job → skips login, opens job form directly
//       • Client Login → standard Firebase login path
//       • Admin/Staff Login → protected role-based auth
//   - Displays Ellicom branding and call to action
//
// Notes:
//   - Acts as root entry in Phase 1 and persists through all phases
//   - May evolve to include dynamic banners or announcements
//   - Component structure should remain mobile-first and responsive
//
// Folder: /components/WelcomePage.jsx
// Author: Abraham Bortey Danfa
//
