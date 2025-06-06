import React from 'react'
import Logo from '../UI/logo';
import CLForm from '../UI/CLForm';

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

        </div>

        <div>
          <p className='text-head font-normal text-center mt-(-4) '> 
            User Login </p>
        </div>

        <div className='mt-20'>
            <CLForm />
        </div>

        <div className='mt-17'>
          <p className='text-gold text-(0.7rem) font-light text-center -mt-1 '> 
            Contact Us
          </p>
        </div>

          


          

          


          

      {/* </div> */}
    </>
  )
}

export default CLPage;
