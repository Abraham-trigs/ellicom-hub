import React from 'react';
import Logo from '../UI/logo';
import NewJobButton from '../UI/JobCardButton';
import CTSideBar from '../UI/CLIENT-UI/CTSideBar';
import Head from '../UI/Head';
import CTLargeFormat from '../UI/LargeFormatRecorder';
import JobCard from '../UI/CLIENT-UI/JobCard';
import JobRecorder from '../UI/JobRecorder';

const  AddJobPage= () => {
  return (
    <>
      <div className='border-gold border-b-1 h-23 mb-5'>
        <div className=" mt-10 flex flex-col justify-end">

          <div className="w-full ">
            <div className=' flex flex-row justify-end'>
              <CTSideBar />
            </div>
          </div>
        </div>

        <div className='scale-50 -mt-26'>
          <Head />
        </div>
      </div>

      {/* JOB CARD and Job Recoder Holder */}
      <div className=' w-full  h-130 rounded-2xl flex flex-col justify-center items-center border-1 border-sea -mt-4'>
     
        <div>
          < JobCard />
          <div className=' flex flex-col w-contain border border-t-0.5 border-sea mb-2 '></div>
          <JobRecorder />
        </div>
      </div>
    </>


  );
};

export default AddJobPage;




