import React from 'react';
import Logo from './logo';

const Head = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-center ">
        <div className=" w-30 h-auto md:w-60 lg:w-72 object-contain">
          <Logo />
        </div>
      </div>

      <div>
        <h1 className="text-gold font-black text-5xl text-center">
          ELLICOM
        </h1>
      </div>

      <div>
        {/* Correct negative margin */}
        <p className="text-head font-normal text-center text-2xl">
          Advertising Ghana Ltd
        </p>
      </div>

    </div>
  );
};

export default Head;
