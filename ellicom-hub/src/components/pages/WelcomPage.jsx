import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/NewJobButton';
import ClientLoginButton from '../UI/ClientLoginButton';
import AvailableButton from '../UI/AvailableNow';
import AvailableNow from '../UI/AvailableNow';

const WelcomPage = () => {
  return (
    <>
      <div>
        <p className='text-head font-normal italic text-center mt-10 '> 
          Welcome to</p>
      </div>

      <div>
        <h1 className='text-gold font-black text-5xl text-center mt-2 '>
          ELLICOM
        </h1>
      </div>

      <div>
        <p className='text-head font-normal text-center mt-(-4) '> 
          Advertising Ghana Ltd </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="px-4 py-9 w-40 md:w-60 lg:w-72 object-contain mb-0">
          <Logo />
        </div>
      </div>
      
      <div className='scale-80 -mt-5'>
        <NewJobButton />
      </div>

      <div className='py-5'>
        <ClientLoginButton />
      </div>
      
      <div>
        <p className='text-head text-(0.7rem) font-light text-center -mt-1 '> 
          Admin / Staff 
        </p>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="-mb-14 scale-80">
          <AvailableNow />
        </div>
      </div>

      <div className='mt-14'>
        <p className='text-gold text-(0.7rem) font-light text-center -mt-1 '> 
          Contact Us
        </p>
      </div>
      
    </>
  )
}

export default WelcomPage;
