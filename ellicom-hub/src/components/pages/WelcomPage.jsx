import { useNavigate } from 'react-router-dom';
import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/NewJobButton';
import ClientLoginButton from '../UI/CTLoginButton';
import AvailableNow from '../UI/AvailableNow';


const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Client/Add-Job');
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
        onClick={handleClick}>New Job+</button>
        <button className='bg-gold font-medium px-8 py-3 rounded-md mb-10'
        onClick={handleClick}>Client</button>
        </div>

        {/* <div className=" w-30 h-10 bg-gold  rounded-2xl mb-3  mt-2">
         <p className='font- text-center px-20 text'>
          AddJob+</p>
        </div>

        <div className=" w-30 h-10 bg-sea  rounded-2xl mb-3 mt-2
        ">
          <p className='font  text-center px-20 text-inline'>
            Client Login</p>
        </div> */}

      </div>
      <div>
        <p 
          onClick={handleClick} 
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
