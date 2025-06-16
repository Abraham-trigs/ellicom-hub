import React from 'react'

const JobCard = () => {
  return (
      <div className="">
        {/* main Job Card with Details  */}
        <div className="-mt-5 flex flex-col justify-center items-center object-contain mb-2">
          <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold scale-75 text-Ground mb-3 object-contain">
            Job Card
          </button>
          
          {/* Job Card */}
          <div className="">
            {/* main Add Job Container */}
            <div className="flex flex-col justify-evenly items-center w-72 h-43 border-2 border-sea bg-darkSea rounded-3xl bg- -mt-3 object-contain">
              <div className='flex flex-row justify-between items-center ml-1  mt-3 '>
                <div className=" flex flex-row justify-between items-center gap-x-1 w-39 h-30 rounded-xl -ml-2  bg-high drop-shadow-sm shadow shadow-2xl scale-95 ">
                  
                 {/* Paper size */}
                  <div className='flex flex-row justify-center items-center m-1 w-18 h-26 rounded-md bg-ground border-1 drop-shadow-sm shadow shadow-md'>
                    <div className='flex flex-col justify-evenly items-center'>
                      {/* Size Selection */}
                      <div className='text-center scale-130 mb-1 border-b-2  border-b-coHead text-coHead'>
                        Size
                      </div>
                      <div className='font-extrabold text-4xl text-center text-gold '>
                        A4
                      </div>
                    </div>
                  </div>

                  {/* Job Type and Quantity Container */}
                  <div className='flex flex-col gap-3 mr-2 drop-shadow-sm shadow shadow-md'>
                    <div className='w-18 h-8 rounded-md bg-ground text-center text-coHead flex flex-row justify-center items-center font-semibold drop-shadow-sm shadow shadow-md'> 
                      Job Type
                    </div>
                    {/* Quantity button & display Container */}
                    <div className=' flex flex-row justify-between items-center w-18 h-10 rounded-md bg-coHead'>
                      <div className='flex flex-row -ml-1 items-center w-10 h-12 rounded-md scale-75  font-bold bg-ground '> 
                        <div className='mr-0.5 ml-1 text-coHead drop-shadow-sm shadow shadow-md'>
                          QTY
                        </div>
                      </div>
                      <div className='text-center text-2xl  font-bold text-red-600 scale-90 mr-3'>
                        50
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color and Option section */}
                <div className="flex- flex-col justify-center items-center ml-1 w-30 h-25 rounded-2xl bg-high drop-shadow-sm shadow shadow-2xl">
                  {/* Color, f/b and other selectors  */}
                  <div className='flex flex-row gap-x-2 justify-center items-center scale-90  mb-2 mt-3'>
                     <div className='w-18 h-8 rounded-md bg-container text-center text-coHead flex flex-row justify-center items-center font-semibold drop-shadow-sm shadow shadow-md'> 
                      Color
                    </div>
                    <div className='w-18 h-8 rounded-md bg-coHead text-center flex flex-row justify-center items-center font-semibold drop-shadow-sm shadow shadow-md'> 
                     Black
                    </div>
                  </div>
                  {/* Color and Black selectors  */}
                  <div className='flex flex-row gap-x-2 justify-center items-center scale-90'>
                    <div className='w-18 h-8 rounded-md bg-coHead font-bold text-center flex flex-row 
                    justify-center items-center drop-shadow-sm shadow shadow-md'> 
                      F / B 
                    </div>
                    <div className='w-18 h-8 rounded-md bg-green-500 text-container
                    
                    // if file is selected successfully turn bg color to green//.............

                    text-center flex flex-row justify-center items-center font-bold '> 
                     File <span className='font-bolder  scale-120 drop-shadow-sm shadow shadow-md'> +</span> 
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-row justify-evenly gap-3 scale-90'>
                <button className='bg-container hover:bg-high hover:text-container text-coHead px-4 py-1 font-bold rounded-md drop-shadow-sm shadow shadow-2xl'>
                  Save order
                </button>
              </div>

            </div>
          </div>
        {/* dividing line */}
        </div>
        
        {/* Job Details */}

        </div>
  )
}

export default JobCard;
