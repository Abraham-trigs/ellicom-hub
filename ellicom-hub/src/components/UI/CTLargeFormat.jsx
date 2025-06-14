import React from 'react'

const CTLargeFormat = () => {
  return (
    <>
    <div className='flex flex-row justify-center items-center'>
      <div className='w-20 h-18 bg-ground'></div>

      <div>
        {/* JOB SIZE */}
        <div className='w-1/2 h-9  justify-center items-end mr-2 ml-2 mt-2 bg-high w-contain rounded-sm'>
          {/* Job Number .....on reciept */}
          <div className='flex flex-row justify-evenly scale-75 object-contain'>
            <div className='text-ground font-bold text-2xl w-15 h-12 text-center'>
              324
            </div>
            {/* JOb Height */}
            <div className='text-ground  text-2xl w-15 h-12 text-center'>
              X
            </div> 
            <div className='text-ground font-bold text-2xl w-15 h-12 text-center'>
              324
            </div>

          </div>

        </div>

        {/* JOB PRICE */}
        <div className='w-1/2 h-9  justify-center items-end mr-2 ml-2 mt-0 bg-sea w-contain rounded-sm'>
          <div className='flex flex-row justify-between scale-75 object-contain '>
            <div className='text-ground font-medium text-2xl w-15 h-12 text-center -ml-6'>
              GHc
            </div>
            {/* JOb Height */}
            <div className='text-ground text-right font-bold text-2xl  h-12  w-1/2 w-contain mr-4'>
              20000.00
            </div>

          </div>

        </div>

      </div>

    </div>




    </>

  
  )
}

export default CTLargeFormat
