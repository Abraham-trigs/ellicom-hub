import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const getDashboardPath = (role) => {
  switch (role) {
    case 'client':
      return '/client/dashboard';
    case 'staff':
      return '/staff/dashboard';
    case 'admin':
    case 'superadmin':
      return '/admin/dashboard'; // make this route real for admin panel
    default:
      return '/';
  }
};

const DashBoardButton = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    const path = user ? getDashboardPath(role) : '/guest/add-job';
    navigate(path);
  };

  return (
    <div className="items-center justify-center">
      <button
        onClick={handleClick}
        className="bg-high p-2 px-7 py-1 rounded-lg text-2xl text-center mb-0 text-ground
        transition ease-in-out duration-100 hover:bg-high hover:scale-95"
      >
        My Dashboard
      </button>
    </div>
  );
};

export default DashBoardButton;
