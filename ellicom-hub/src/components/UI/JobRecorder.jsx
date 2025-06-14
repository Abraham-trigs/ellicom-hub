import React from 'react'
import CTLargeFormat from './CTLargeFormat';

const JobRecorder = () => {
  return (
        <div className=' ml-2 mr-2 w-73 h-70 border-2 border-inactive  rounded-2xl'>
          <div className='flex flex-col justify-center items-center'>
            <button className="text flex items-center -mt-1 bg-sea rounded-b-2xl p-2 px-5 font-bold scale-90 text-Ground mb-3 object-contain">
              Job Details              
            </button>
          </div>
            {/* Newly Saved, Job Details Holder */}
            <div className='w-contain ml-1 mr-1 w-70 h-50 bg-darkSea border-2 border-high rounded-2xl'>
              {/* Job Recorder */}
              {/* Details of all saved Job */}

              {/* Large Format Job Recorder */}
              <div>
                <CTLargeFormat />
              </div>
            </div>
          </div>
  )
}

export default JobRecorder;


