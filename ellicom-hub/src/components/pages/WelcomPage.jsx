import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/NewJobButton';
import ClientLoginButton from '../UI/ClientLoginButton';
import AvailableButton from '../UI/AvailableButton';

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

      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="-mb-14 scale-80">
          <AvailableButton />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-5 w-full h-40 border-y-2 border-sea">
          <div className="w-20 h-25 rounded-lg border-2 border-sea bg-head -mb-5"></div>
          <div className="w-20 h-25 rounded-lg border-2 border-sea bg-head -mb-5"></div>
          <div className="w-20 h-25 rounded-lg border-2 border-sea bg-head -mb-5"></div>
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-gold text-(0.7rem) font-light text-center -mt-1 '> 
          Contact Us
        </p>
      </div>
      
    </>
  )
}

export default WelcomPage;
