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


/* 
// 🧭 WelcomePage.jsx – Public Entry Screen
//
// Acts as the root landing page of the Ellicom platform
// Directs users to 3 access levels via buttons: Guest, Client, and Admin/Staff
// Clean UI with company logo, motto, and a responsive, centered layout
// Uses `useNavigate()` from React Router to trigger routing
// Highlights company brand and service division
//
// 📦 Linked Navigation Paths:
//    - Guest → /Guest/Add-Job
//    - Client → /Client/login
//    - Staff → /Staff/login
//
// 💡 Notes:
//    - Admin/Staff button is centered using `flex justify-center w-full`
//    - `JobCardButton` and `ClientLoginButton` are currently unused imports
//    - `AvailableNow` displays real-time badge or CTA
*/
