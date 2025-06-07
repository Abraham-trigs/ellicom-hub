import React from 'react';
import Logo from './logo';

const Header = () => {
  return (
    <div className="   w-full h-auto  ">
      <div className="flex items-center justify-center ">
        <div className="px-4 py-9 w-40 md:w-60 lg:w-72 mt-15 object-contain">
          <Logo />
        </div>
      </div>

      <div>
        <h1 className="text-gold font-black text-5xl text-center -mt-8">
          ELLICOM
        </h1>
      </div>

      <div>
        {/* Correct negative margin */}
        <p className="text-head font-normal text-center ">
          Advertising Ghana Ltd
        </p>
      </div>

    </div>
  );
};

export default Header;
