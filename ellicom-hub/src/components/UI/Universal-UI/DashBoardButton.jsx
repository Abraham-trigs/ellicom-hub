import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';

/**
 * 📍 getDashboardPath – Resolves dashboard route based on user role
 * Includes dedicated path for superadmin
 */
const getDashboardPath = (role) => {
  switch (role?.toLowerCase()) {
    case 'client':
      return '/client/dashboard';
    case 'staff':
      return '/staff/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'superadmin':
      return '/superadmin/dashboard';
    default:
      return '/';
  }
};

const DashBoardButton = ({ label = 'My Dashboard', className = '' }) => {
  const { user, role } = useUserStore();
  const navigate = useNavigate();

  const handleClick = () => {
    const path = user ? getDashboardPath(role) : '/guest/add-job';
    navigate(path);
  };

  return (
    <div className="items-center justify-center">
      <button
        onClick={handleClick}
        className={`bg-high p-2 px-7 py-1 rounded-lg text-2xl text-center mb-0 text-ground transition ease-in-out duration-100 hover:bg-high hover:scale-95 ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

export default DashBoardButton;

/*
📄 Component: DashBoardButton.jsx

🧠 Purpose:
- Shows a button that navigates users to their role-based dashboard.
- Handles both authenticated and guest users.

✅ Now fully supports: superadmin, admin, staff, client, and fallback to guest route.
✨ Refactored to allow custom label and styling via props for reuse.
*/
