import React from 'react'
import LargeFormatRecorder from './LargeFormatRecorder';
import PapperPrintingRecorder from './PapperPrintingRecorder';
import ScanningRecorder from './ScanningRecorder';
import PhotocopyRecorder from './PhotocopyRecorder';

const JobRecorder = () => {
  return (
    <div className=' ml-2 mr-2 w-73 h-70 border-2 border-coHead bg-darkSea  rounded-2xl'>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-row item-center'>
         
          {/* Total Amount here */}
          <button className="text flex items-center -mt-1 bg-sea rounded-b-2xl p-2 px-5 font-bold scale-90 text-Ground mb-3 object-contain">
            GHc 1,200            
          </button>
        </div>
      </div>

      {/* Newly Saved, Job Details Holder */}
      {/* Job Recorder */}
      {/* Details of all saved Job */}

      {/* Large Format Job Recorder */}
      <div>
        <LargeFormatRecorder />
        {/* <PapperPrintingRecorder /> */}
        {/* <ScanningRecorder /> */}
        <PhotocopyRecorder />
      </div>
    </div>
  )
}

export default JobRecorder;


