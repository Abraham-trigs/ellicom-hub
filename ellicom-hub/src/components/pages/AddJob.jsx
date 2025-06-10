import React from 'react'
import CTSideBar from '../UI/CTSideBar';
import Head from '../UI/Head';

const AddJob = () => {
  return (
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
  )
}

export default AddJob;
