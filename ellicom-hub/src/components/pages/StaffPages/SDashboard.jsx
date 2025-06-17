import React from 'react'
import NewJobButton from '../../UI/Universal-UI/JobCardButton';
import SSideBar from '../../UI/Staff-UI/SSideBar';
import Head from '../../UI/Universal-UI/Head';
import SJobHolder from '../../UI/Staff-UI/SJobHolder';

const SDashboard = () => {
  return (
    <>
      <div className='border-gold border-b-1 h-35 mb-5'>
        
        <div className=" mt-10 flex flex-col items-center justify-between g  ">

          <div className="w-full flex flex-row justify-between -ml-20">

            <div className='scale-50'>
              <NewJobButton />
            </div>

            <div className='-mr-10'>
              <SSideBar />
            </div>
          </div>
      
        </div>

        <div className='scale-50 -mt-37'>
          <Head />
        </div>
      </div>

      <div>
        <SJobHolder />
      </div>

    </>

    // </div>
  )
}

export default SDashboard;
