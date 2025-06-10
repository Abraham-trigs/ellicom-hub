import React from 'react'
import CTSideBar from '../UI/CTSideBar';
import Head from '../UI/Head';
job

const AddJob = () => {
  return (
    <>
    <div>
      <div className='border-gold border-b-1 h-25 mb-5'>
        <div className=" mt-20 flex flex-row-reverse justify-between  items-center   ">
          <div className="">
            <div className=' -mt-30'>
              <CTSideBar />
            </div>
          </div>
          <div className='scale-50 -mt-37 ml-20'>
            <Head />
          </div>
        </div>

      </div>
    </div>

    <div className='ml-3'>
        <div className='mb-1 font-bold text-center'>ID-EAG095</div>

        <div className='w-45 h-25 bg-power rounded-2xl mb-2'>
          <div className='flex flex-col justify-center item-center'>
            <button className='text-head font-bold text-center p-1 px-2 '>Status</button>
          </div>

          <div className='flex flex-col items-center'>;

            {/* pecentage Gauge */}
            <div className=' bg-head w-40 h-10 -my-4 rounded-2xl '></div>
          </div>

        </div>

        {/* Name of Job Supevisor */}
        <div className='w-full h-auto flex flex-row  '>
          <div className='bg-ground rounded-md w-30 text-center text-head '>Supervisor</div>  
          <div className='text-ground ml-1'>Ebenezer  </div>
        </div>
    </div>

    <div className='-ml-3'>

        <div className=' -ml-6 flex flex-row justify-center items-center'>

          <div className='flex w-12 h-20 bg-power rounded-b-2xl mb-4 '>

            <div className='scale-75 '>
              <Logo />
              <p className='text-gold text-center  '>
                Print
              </p>
            </div>

          </div>
        </div>

        <div className='flex flex-col justify-center items-center '>

          <button className='bg-high p-1 rounded-sm px-3 font-medium ml-3'>
            Details
          </button>
        
        </div>

    </div>


    


    </>

  




  )
}

export default AddJob;
