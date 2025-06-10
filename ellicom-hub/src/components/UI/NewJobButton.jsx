import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCardButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Client/Add-Job');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        onClick={handleClick}
        className='bg-gold  py-3 px-7 text-ground rounded-lg font-bold text-2xl text-center
        transition ease-in-out duration-200 hover:bg-high hover:scale-95'
      >
        New Job <span className='text-3xl p-3 py-2 font-black'> + </span>
      </button>
    </div>
  );
};

export default JobCardButton;
