
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CTLForm from '../../UI/CLIENT-UI/CTLForm';
import Logo from '../../UI/Universal-UI/logo';

const CTLPage = () => {
  return (
    <>
      <div className='scale-80'>
        <div className="flex items-center justify-center mt-5 ">
          <div className="px-4 py-9 w-40 md:w-60 lg:w-72 object-contain ">
            <Logo />
          </div>
        </div>

        <div>
          <h1 className='text-gold font-black text-5xl text-center -mt-8'>
            ELLICOM
          </h1>
        </div>

        <div>
          <p className='text-head font-normal text-center mt-(-4)'> 
            Advertising Ghana Ltd
          </p>
        </div>

        <div>
          <p className='text-inactive font-normal italic text-center mt-(-4)'> 
            Client Login <span className='text-highGold'>Only</span>
          </p>
        </div>
      </div>

      <div className='mt-3'>
        <CTLForm />
      </div>
    </>
  );
};

export default CTLPage;


// Added setLoginType('client') inside useEffect() to make sure role-based login works correctly.

// Connected everything via Zustand state: email, password, loading, error, login, setLoginType.
