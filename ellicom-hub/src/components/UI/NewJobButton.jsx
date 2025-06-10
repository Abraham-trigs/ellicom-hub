import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCardButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/JobCard');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        onClick={handleClick}
        className='bg-gold p-2 px-7 py-1 text-ground rounded-lg font-normal text-2xl text-center
        transition ease-in-out duration-200 hover:bg-high hover:scale-95'
      >
        New Job <span className='text-2xl p-0 font-black'>+</span>
      </button>
    </div>
  );
};

export default JobCardButton;
