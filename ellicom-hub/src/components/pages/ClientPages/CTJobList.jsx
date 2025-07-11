import React from 'react';
import Logo from '../../UI/Universal-UI/logo';
import JobCardButton from '../../UI/Universal-UI/JobCardButton';
import CTSideBar from '../../UI/CLIENT-UI/CTSideBar';
import Head from '../../UI/Universal-UI/Head';


const  CTJobList= () => {
  return (
    <>
      <div className='border-gold border-b-1 h-23 -mb-2'>
        <div className=" mt-10 flex flex-col items-center justify-between g  ">
          <div className="w-full flex flex-row justify-between -ml-20 -mt-4">
            <div className='scale-50'>
              <JobCardButton />
            </div>
            <div className='-mr-10'>
              <CTSideBar />
            </div>
          </div>
      </div>

      <div className='scale-50 -mt-27'>
        <Head />
      </div>
      </div>

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
                <div className='w-45 h-35 bg-power rounded-2xl'></div>
              </div>
              <div className=''>
                <div className=' flex flex-row justify-center items-center'>
                  <div className='flex w-15 h-20 bg-power rounded-b-2xl mb-2'>
                    <div className='scale-75 '>
                      <Logo />
                      <p className='text-gold text-center '>
                        Print
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center gap-2'>

                  <button className='bg-high p-1 rounded-sm px-3 font-medium'>
                    Details
                  </button>

                  <button className='bg-sea p-1 rounded-sm px-3 font-medium'>
                    Role
                  </button>
                </div>

              </div>

          </div>
        </div>

      </div>
    </div>

    </>
  );
};

export default CTJobList;
