import React from 'react'

const CTLargeFormat = () => {
  return (
    <>
    <div>
      <div></div>
        <div className='flex flex-row justify-center items-center scale-90'>

          <div className='flex flex-col justify-center items-center w-20 h-18 mt-2 bg-container rounded-bl-2xl'>
            <div className='scale-90'>
              <div className='text-center scale-130 mb-1  text-high font-bold'>
                2.00
              </div>
              <div className='font-extrabold text-4xl text-center text-head scale-50'>
                FLEXY
              </div>

            </div>
          </div>

        <div>
          {/* JOB SIZE */}
          <div className='w-auto h-9  justify-center items-end mr-2  mt-2 bg-high w-contain rounded-tr-md'>
            {/* Job Number .....on reciept */}
            <div className='flex flex-row justify-between scale-75 object-contain'>
              <div className='text-ground font-bold text-2xl w-15 h-12 text-center'>
                1234
              </div>
              {/* JOb Height */}
              <div className='text-ground  text-2xl w-15 h-12 text-center'>
                X
              </div> 
              <div className='text-ground font-bold text-2xl w-15 h-12 text-center'>
                4321
              </div>
            </div>

          </div>

          {/* JOB PRICE */}
          <div className='w-auto h-9  justify-center items-end mr-2  bg-container w-contain rounded-br-md'>
            <div className='flex flex-row justify-between scale-75 object-contain '>
              <div className='text-sea font-medium text-2xl w-15 h-12 text-center -ml-6'>
                GHc
              </div>
              {/* JOb Height */}
              <div className='text-sea text-right font-bold text-2xl  h-12  w-1/2 w-contain mr-4'>
                20000.00
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>




    </>

  
  )
}

export default CTLargeFormat
