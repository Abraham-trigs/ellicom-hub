import React from 'react';
import  useJobCardStore  from '../../store/JobCardStore';

import LargeFormatRecorder from './LargeFormatRecorder';
import PapperPrintingRecorder from './PapperPrintingRecorder';
import ScanningRecorder from './ScanningRecorder';
import PhotocopyRecorder from './PhotocopyRecorder';

const JobRecorder = () => {
  const { jobType } = useJobCardStore();

  const renderRecorder = () => {
    switch (jobType) {
      case 'Photocopy':
        return <PhotocopyRecorder />;
      case 'Printing':
        return <PapperPrintingRecorder />;
      case 'Large Format':
        return <LargeFormatRecorder />;
      case 'Scanning':
        return <ScanningRecorder />;
      default:
        return null;
    }
  };

  return (
    <div className="ml-2 mr-2 w-73 h-70 border-2 border-coHead bg-darkSea rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row items-center">
          {/* Total Amount here — placeholder */}
          <button className="text flex items-center -mt-1 bg-sea rounded-b-2xl p-2 px-5 font-bold scale-90 text-ground mb-3 object-contain">
            GHc 1,200
          </button>
        </div>
      </div>

      {/* 🎯 Render only the active recorder */}
      <div>{renderRecorder()}</div>
    </div>
  );
};

export default JobRecorder;
