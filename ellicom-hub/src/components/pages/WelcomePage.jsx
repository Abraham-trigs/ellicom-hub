import { useNavigate } from 'react-router-dom';
import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/JobCardButton';
import ClientLoginButton from '../UI/CLIENT-UI/CTLoginButton';
import AvailableNow from '../UI/AvailableNow';


const WelcomePage = () => {
  const navigate = useNavigate();

  const ClientLogin = () => {
    navigate('/Client/login');
  };

  const StaffLogin = () => {
    navigate('/Staff/login');
  };
  
   const GuestAddJob = () => {
    navigate('/Guest/Add-Job');
  };
  
  



  return (
    <>
      <div>
        <p className="text-gold font-normal italic text-center mt-10"> 
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

      <div className=''>
        <div className='flex flex-row justify-evenly gap-0'>
        <button className='bg-sea font-medium px-3 py-3 rounded-md mb-10 '
        onClick={GuestAddJob}>New Job+</button>

        <button className='bg-gold font-medium px-8 py-3 rounded-md mb-10'
        onClick={ClientLogin}>Client</button>
        </div>

      </div>
      <div>
        <p 
          onClick={StaffLogin} 
          className="cursor-pointer text-head text-2xl font-light text-center -mt-3 scale-75"
        >
          Admin / Staff
        </p>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center">
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
