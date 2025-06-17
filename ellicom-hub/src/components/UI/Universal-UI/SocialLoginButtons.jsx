import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaMicrosoft,
  FaApple,
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const providers = [
  {
    name: 'Google',
    icon: <FcGoogle className="text-2xl" />,
    bg: 'bg-white',
  },
  {
    name: 'Facebook',
    icon: <FaFacebookF className="text-2xl text-gold" />,
    bg: 'bg-blue-600',
  },
  {
    name: 'Twitter',
    icon: <FaTwitter className="text-2xl text-gold" />,
    bg: 'bg-blue-400',
  },
  {
    name: 'Apple',
    icon: <FaApple className="text-2xl text-gold" />,
    bg: 'bg-black',
  },

  {
    name: 'Microsoft',
    icon: <FaMicrosoft className="text-2xl text-gold" />,
    bg: 'bg-blue-700',
  },
  
];

const SocialLoginButtons = () => {
  const handleLogin = (providerName) => {
    console.log(`Login with ${providerName}`);
    // Hook up your login logic here
  };

  return (
    <div className="flex flex-row gap-4 justify-center">
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleLogin(provider.name)}
          className={`px-3 py-2 shadow-md hover:scale-110 hover:scale- transition-all duration-200`}
          aria-label={`Login with ${provider.name}`}
        >
          {provider.icon}
        </button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;
