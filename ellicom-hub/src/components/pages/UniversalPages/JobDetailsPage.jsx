import React from 'react'
import CTSideBar from '../../UI/CLIENT-UI/CTSideBar'
import Head from '../../UI/Universal-UI/Head'
import LargeFormatRecorder from '../../UI/Universal-UI/LargeFormatRecorder'
import PapperPrintingRecorder from '../../UI/Universal-UI/PapperPrintingRecorder'
import ScanningRecorder from '../../UI/Universal-UI/ScanningRecorder'
import PhotocopyRecorder from '../../UI/Universal-UI/PhotocopyRecorder'

const JobDetailsPage = () => {
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

      {/* Job Details  */}

      <div className=' ml-2 mr-2 w-73 h-70 border-2 border- bg-container  rounded-2xl'>
        <div className='flex flex-col justify-center items-center'>
          <button className="text flex items-center -mt-1 bg-sea rounded-b-2xl p-2 px-5 font-bold scale-90 text-Ground mb-3 object-contain">
            Job Details              
          </button>
        </div>

        <div>
          <LargeFormatRecorder />
          {/* <PapperPrintingRecorder /> */}
          {/* <ScanningRecorder /> */}
          {/* <PhotocopyRecorder /> */}
        </div>
      </div>
    </>
  )
}

export default JobDetailsPage;
