import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/NewJobButton';
import CTSideBar from '../UI/CTSideBar';
import Head from '../UI/Head';

const  CTAddJob= () => {
  return (
    <>
      <div className='border-gold border-b-1 h-23 mb-5'>
        <div className=" mt-10 flex flex-col justify-end">

        <div className="w-full ">

          {/* <div className='scale-50'>
            <NewJobButton />
          </div> */}

          <div className=' flex flex-row justify-end'>
            <CTSideBar />
          </div>
        </div>

      </div>

    <div className='scale-50 -mt-27'>
      <Head />
    </div>
      </div>

      <div className=" w-full  h-100 rounded-2xl flex flex-col items-center justify-center border-1 border-sea -mt-4">
        {/* Scaled Button */}
        <div className="-mt-57 flex flex-col justify-center items-center object-contain">
          <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold scale-75 text-Ground mb-3 object-contain">
            My Jobs
          </button>
          
          {/* Job Card */}
          <div className="">
            {/* main Add Job Container */}
            <div className="flex flex-row justify-between items-center  w-70 h-35 rounded-3xl border-2 bg-container -mt-3 ">
              <div className=" w-35 h-30 rounded-3xl border-2 border-sea bg-NeonSea "></div>
              <div className=" w-35 h-30 rounded-3xl border-2 border-sea bg-NeonSea "></div>
            </div>
          </div>

        </div>

      </div>
    </>


  );
};

export default CTAddJob;




