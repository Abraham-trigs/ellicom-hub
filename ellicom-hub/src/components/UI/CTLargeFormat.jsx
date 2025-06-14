import React from 'react'

const CTLargeFormat = () => {
  return (
    <>
    <div className='w-1/2 h-9 flex flex-row justify-center items-end mr-2 ml-2 mt-2 bg-sea w-contain rounded-sm'>
      {/* Job Number .....on reciept */}
      {/* width */}
      <div className='text-ground font-black text-2xl w-15 h-12 text-center'>
        123
      </div>
      {/* Height */}
      <div className='text-ground  text-2xl w-15 h-12 text-center'>
        X
      </div> 
      <div className='text-ground font-black text-2xl w-15 h-12 text-center'>
        321
      </div>

    </div>


    <div className='flex flex-row justify-between items-center mr-2 ml-2 mt-2 bg-container w-contain h-15 rounded-sm'>
      {/* Job Number .....on reciept */}
      <div className=' text-ground font-black text-4xl w-15 h-12 text-center border-r-2 border-ground'>
        00
      </div>
      {/* width */}
      <div className='text-ground font-black text-2xl w-15 h-12 text-center'>
        123
      </div>
      {/* Height */}
      <div className='text-ground  text-2xl w-15 h-12 text-center'>
        X
      </div> 
      <div className='text-ground font-black text-2xl w-15 h-12 text-center'>
        321
      </div>

    </div>


    </>

  
  )
}

export default CTLargeFormat
