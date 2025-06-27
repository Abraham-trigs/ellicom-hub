import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';
import getJobRouteForRole from '../../../utils/roleRoutes';

const JobCardButton = () => {
  const navigate = useNavigate();

  // 🧠 Global Zustand role and loading state
  const role = useUserStore((state) => state.role);
  const loading = useUserStore((state) => state.loading);

  // 📦 Dynamically navigate based on user's role
  const handleClick = () => {
    const route = getJobRouteForRole(role);
    navigate(route);
  };

  // ⏳ While checking auth state, show UX placeholder
  if (loading) return <p className="text-gray-400 text-sm">Checking access...</p>;

  // 🚫 Hide button if no valid role is assigned
  if (!role) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        className="bg-gold py-1 text-ground rounded-lg font-bold text-2xl text-center
        transition ease-in-out duration-200 hover:bg-high hover:scale-95 px-2"
      >
        New Job <span className="p-3 py-2 font-black"> + </span>
      </button>
    </div>
  );
};

export default JobCardButton;

/*
📄 Component: JobCardButton.jsx

🧠 Purpose:
- Renders a role-sensitive "New Job" button.
- Navigates users to the appropriate job submission page based on their role (client, staff, admin, superadmin).

🔐 Auth & Role Logic:
- Pulls role and loading state from Zustand's useUserStore.
- Hides button for unauthorized or unauthenticated users.
- Displays loading text while role is resolving.

🌍 Routes:
- Uses getJobRouteForRole() to dynamically route users by role.
  (Defined in: src/utils/roleRoutes.js)

✅ Ready for dashboard use across all verified roles.
*/
