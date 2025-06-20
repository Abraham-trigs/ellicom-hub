import React from 'react'
import Logo from '../UI/logo';
import CLForm from '../UI/CTLForm';
import SocialLoginButtons from '../UI/SocialLoginButtons';

const CLPage = () => {
  return (
    <>
      {/* <div> */}

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
          <p className='text-head font-normal text-center mt-(-4) '> 
            User Login </p>
        </div>

        <div className='mt-3'>
            <CLForm />
        </div>

        <div className='flex flex-col justify-center items-center scale-70 -mt-4 '>
          <p className='text-head text-2xl scale-93 mb-8'>- or -</p>
            <SocialLoginButtons />
        </div>

        <div className='mt-3'>
          <p className='text-gold text-(0.7rem) font-light text-center -mt-1 '> 
            Contact Us
          </p>
        </div>

          


          

          


          

      {/* </div> */}
    </>
  )
}

export default CLPage;
