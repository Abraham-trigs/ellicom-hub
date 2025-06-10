import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/NewJobButton';
import CTSideBar from '../UI/CTSideBar';
import Head from '../UI/Head';

const  CTJobList= () => {
  return (
    <>
      <div className='border-gold border-b-1 h-35 mb-5'>
        <div className=" mt-10 flex flex-col items-center justify-between g  ">

        <div className="w-full flex flex-row justify-between -ml-20">

          <div className='scale-50'>
            <NewJobButton />
          </div>

          <div className='-mr-10'>
            <CTSideBar />
          </div>
        </div>

      </div>

    <div className='scale-50 -mt-37'>
      <Head />
    </div>
      </div>

      <div className=" w-full  h-100 rounded-2xl flex flex-col items-center justify-center border-1 border-sea mt-3">
        {/* Scaled Button */}
        <div className="-mt-70 flex flex-col justify-center items-center">
          <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold text-Ground mb-4">
            My Jobs
          </button>
          
          {/* Job Card */}
          <div className="">
            {/* main Add Job Container */}
            <div className="flex flex-row justify-between mx-0.5 w-70 h-25 rounded-3xl border-2 bg-container -mb-9 ">
            <div className=" w-40 h-25 rounded-3xl border-2 border-sea bg-NeonSea -mb-9 ">
            
            </div>
            </div>
          </div>

        </div>

      </div>
    </>


  );
};

export default CTJobList;




