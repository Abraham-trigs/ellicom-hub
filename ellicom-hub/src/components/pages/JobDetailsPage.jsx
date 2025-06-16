import React from 'react'
import CTSideBar from '../UI/CLIENT-UI/CTSideBar'
import Head from '../UI/Head'

const JobDetailsPage = () => {
  return (
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
    </div>  )
}

export default JobDetailsPage;
