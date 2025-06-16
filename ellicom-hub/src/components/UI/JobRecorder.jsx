import React from 'react'
import LargeFormatRecorder from './LargeFormatRecorder';
import PapperPrintingRecorder from './PapperPrintingRecorder';
import ScanningRecorder from './ScanningRecorder';

const JobRecorder = () => {
  return (
    <div className=' ml-2 mr-2 w-73 h-70 border-2 border-inactive  rounded-2xl'>
      <div className='flex flex-col justify-center items-center'>
        <button className="text flex items-center -mt-1 bg-sea rounded-b-2xl p-2 px-5 font-bold scale-90 text-Ground mb-3 object-contain">
          Job Details              
        </button>
      </div>

      {/* Newly Saved, Job Details Holder */}
      {/* Job Recorder */}
      {/* Details of all saved Job */}

      {/* Large Format Job Recorder */}
      <div>
        {/* Large Format Job Recorder */}
        {/* <LargeFormatRecorder /> */}
        <PapperPrintingRecorder />
        <ScanningRecorder />
      </div>
    </div>
  )
}

export default JobRecorder;


