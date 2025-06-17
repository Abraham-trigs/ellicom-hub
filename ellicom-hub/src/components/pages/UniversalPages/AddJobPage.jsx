import React from 'react';
import Logo from '../../UI/Universal-UI/logo';
import SideBar from '../../UI/Universal-UI/SideBar';
import LargeFormatRecorder from '../../UI/Universal-UI/LargeFormatRecorder';
import JobCard from '../../UI/Universal-UI/JobCard';
import JobRecorder from '../../UI/Universal-UI/JobRecorder';
import Head from '../../UI/Universal-UI/Head';


const  AddJobPage= () => {
  return (
    <>
      <div className='border-gold border-b-1 h-23 mb-5'>
        <div className=" mt-10 flex flex-col justify-end">

          <div className="w-full ">
            <div className=' flex flex-row justify-end'>
              <SideBar />
            </div>
          </div>
        </div>

        <div className='scale-50 -mt-26'>
          <Head />
        </div>
      </div>

      {/* JOB CARD and Job Recoder Holder */}
      <div className=' w-full  h-130 rounded-2xl flex flex-col justify-center items-center  border- border-sea -mt-4'>
     
        <div>
          < JobCard />
          {/* <div className=' flex flex-col w-contain border border-t-0.5 border-sea mb-2 '></div> */}
          <JobRecorder />
        </div>
      </div>
    </>


  );
};

export default AddJobPage;




