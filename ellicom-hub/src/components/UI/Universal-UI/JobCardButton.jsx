import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore'; // ✅ Zustand store
import { getJobRouteForRole } from '../../utils/roleRoutes'; // ✅ Util route map

const JobCardButton = () => {
  const navigate = useNavigate();

  // 🔄 Global role state from Zustand
  const role = useUserStore((state) => state.role);
  const loading = useUserStore((state) => state.loading);

  const handleClick = () => {
    const route = getJobRouteForRole(role);
    navigate(route);
  };

  // 🧼 UX fallback while role is loading
  if (loading) return <p className="text-gray-400 text-sm">Checking access...</p>;

  // 🚫 Hide if no role found (e.g. guest)
  if (!role) return null;

  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        onClick={handleClick}
        className='bg-gold py-1 text-ground rounded-lg font-bold text-2xl text-center
        transition ease-in-out duration-200 hover:bg-high hover:scale-95 px-2'
      >
        New Job <span className='p-3 py-2 font-black'> + </span>
      </button>
    </div>
  );
};

export default JobCardButton;
