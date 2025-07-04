// src/components/JobCardButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';
import getJobRouteForRole from '../../../utils/roleRoutes';

const JobCardButton = () => {
  const navigate = useNavigate();

  const role = useUserStore((state) => state.role);
  const loading = useUserStore((state) => state.loading);

  const handleClick = () => {
    const route = getJobRouteForRole(role);
    navigate(route);
  };

  if (loading) return <p className="text-gray-400 text-sm">Checking access...</p>;
  if (!role) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        className="hover:bg-darkSea bg-sea hover:text-coHead font-medium text-ground px-3 py-3 border-neonSea rounded-md mb-5"
      >
        New Job+
      </button>
    </div>
  );
};

export default JobCardButton;
