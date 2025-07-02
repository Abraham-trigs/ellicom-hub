import React from 'react';
import Logo from '../../UI/Universal-UI/logo';
import LoginForm from '../../UI/Universal-UI/LoginForm';

const LoginPage = () => {
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

        <div className='mt-15'>
          <p className='text-inactive font-normal italic text-center mt-(-4)'> 
            Anything They Do, We Do it Better
          </p>
        </div>
      </div>

      <div className='-mt-7'>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
