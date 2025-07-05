import React from 'react';
import useJobCardStore from '../../store/JobCardStore';

const PhotocopyRecorder = () => {
  const { jobType, paperSize, quantity, colorType } = useJobCardStore();

  return (
    <div className="mb-2 w-contain ml-1 mr-1 w-70 h-contain bg-darkSea border-2 border-sea rounded-2xl">
      <div>
        {/* Job Type Display */}
        <div className="text-center text-coHead font-bold">{jobType}</div>

        <div className="flex flex-row justify-center items-center scale-90">
          {/* Left Block: Price & Paper Size */}
          <div className="flex flex-col justify-center items-center w-20 h-18 mt-2 bg-container rounded-bl-2xl">
            <div className="scale-90">
              <div className="text-center scale-130 mb-1 text-high font-bold">
                2.00
              </div>
              
              {/* PAPER SIZE HERE  */}
              <div className="font-extrabold text-4xl text-center text-sea scale-90">
                {paperSize}
              </div>
            </div>
          </div>

          {/* Right Block: Qty & Total */}
          <div>
            <div className="w-auto h-9 justify-center items-end mr-2 mt-2 bg-sea w-contain rounded-tr-md">
              <div className="flex flex-row justify-between gap-5 scale-75 object-contain">
                <div className="text-ground font-bold text-2xl w-15 h-12 text-center">
                  {colorType}
                </div>
                <div className="text-ground text-2xl w-15 h-12 text-center">
                  F/B
                </div>
                <div className="text-container font-bold text-2xl w-15 h-12 text-center">
                  {/* File info here if needed */}
                </div>
              </div>
            </div>

            <div className="w-auto h-9 justify-center items-end mr-2 bg-container w-contain rounded-br-md">
              <div className="flex flex-row justify-between gap-10 scale-75 object-contain">
                <div className="flex flex-row text-sea font-medium text-2xl w-auto h-12 text-center -ml-8">
                  QTY: <span className='text-high font-bold text-2xl' >{quantity}</span> 
                </div>

                {/* Price */}
                <div className="text-high text-right font-bold text-2xl h-12 w-1/2 w-contain -mr-3">
                {/* {amount} */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotocopyRecorder;
