import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSLStore from '../../store/SLStore';
import Logo from '../../UI/logo';
import SLForm from '../../UI/Staff-UI/SLForm';

const SLPage = () => {
  const { name, password, setName, setPassword, login } = useSLStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(navigate);
  };

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
          <p className='text-head font-normal text-center mt-(-4) '> 
            Advertising Ghana Ltd </p>
        </div>
      </div>

        <div>
          <p className='text-inactive font-normal italic text-center mt-(-4) '> 
            Staff Login <span className='text-highGold'>Only</span> </p>
        </div>

      <div className='mt-3'>
          <SLForm />
      </div>
    </>
    
  );
};

export default SLPage;
