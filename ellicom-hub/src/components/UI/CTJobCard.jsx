import React from 'react'
import Logo from './logo'

const CTJobCard = () => {
  return (
    <div className=" w-full  h-100 rounded-2xl flex flex-col items-center justify-center border-1 border-sea mt-3">
      {/* Scaled Button */}
      <div className="-mt-50 flex flex-col justify-center items-center">
        <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold text-ground mb-4">
          Current Jobs
        </button>

        <div className="">
          <div className="flex flex-row justify-between mx-0.5 w-70 h-45 rounded-3xl border-2 bg-gold -mb-9 ">

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

          </div>
        </div>

      </div>

    </div>
  )
}

export default CTJobCard
