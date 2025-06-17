import React from 'react';
import ellicom_logo from '@/assets/images/ellicom_logo.svg';

const Logo = () => {
  return <
    img src={ellicom_logo} 
    alt="Ellicom Logo"
    className='w-40 md:w-60 lg:72 object-contain' />;
};

export default Logo;
