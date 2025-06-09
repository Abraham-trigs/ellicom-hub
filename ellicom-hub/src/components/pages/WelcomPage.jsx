import { useNavigate } from 'react-router-dom';
import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/NewJobButton';
import ClientLoginButton from '../UI/CTLoginButton';
import AvailableNow from '../UI/AvailableNow';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Staff-Login');
  };

  return (
    <>
      <div>
        <p className="text-head font-normal italic text-center mt-10"> 
          Welcome to
        </p>
      </div>

      <div>
        <h1 className="text-gold font-black text-5xl text-center mt-2">
          ELLICOM
        </h1>
      </div>

      <div>
        <p className="text-head font-normal text-center "> 
          Advertising Ghana Ltd
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="px-4 py-9 w-40 md:w-60 lg:w-72 object-contain mb-0">
          <Logo />
        </div>
      </div>

      <div className="scale-60 -mt-5">
        <NewJobButton />
      </div>

      <div className="py-2 scale-90">
        <ClientLoginButton />
      </div>

      <div>
        <p 
          onClick={handleClick} 
          className="cursor-pointer text-head text-[0.7rem] font-light text-center mt-1"
        >
          Admin / Staff
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="-mb-12">
          <AvailableNow />
        </div>
      </div>

      <div className="mt-17">
        <p className="text-gold text-[0.9rem] font-light text-center -mt-1"> 
          Contact Us
        </p>
      </div>
    </>
  );
};

export default WelcomePage;
