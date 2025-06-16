import React from 'react';
import JobCardButton from '../../UI/JobCardButton';
import CTDashButton from '../../UI/CLIENT-UI/CTDashButton';
import SSideBar from '../../UI/Staff-UI/SSideBar';
import AvailableNow from '../UI/AvailableNow';

const Home = () => {
  return (
    <>
    <div>
        <div className="w-full mt-10">

        <div className="w-full flex justify-between ">

          <div className='scale-75 mb-3'>
            <JobCardButton />
          </div>

          <div>
            <SSideBar />
          </div>
        </div>

      </div>

      <div className=" scale-75 flex flex-col items-center justify-center">
        <CTDashButton />
      </div>
    </div>

    <div className='mt-4'>
      <AvailableNow />
    </div>

    <div className=' fixed w-full flex flex-row justify-between mt-4'>
      <div className='h-70 flex w-full flex-col'>
        <h1 className='font-black text-gold text-center'>CAR BRANDING</h1>

        <p className='text-head text-center'>sdfgsdftertertertrt ertertertertertertert
            ertehrtybuyqweucbteruyr
            rueirbycurfguygert

            ertkjerouytruger
            ertertygyuer
            ertieryibuert

            erterutyerituer
            ertoiuertiyertuierter
            ertoiuertierytert
            ertjerityierter
            ertiuyerityr</p>
      </div> 

      <div className='mt-8 scale-90 flex flex-col '>
        <div className='w-50 h-50 bg-sea rounded-full scale-150'></div>

        <div className='w-50 h-50 bg-gold rounded-full scale-150 -mt-44'></div>

      <div className='w-50 h-50 bg-white rounded-full scale-150 -mt-53'></div>
    </div>


    </div>






    </>
  );
};

export default Home;
