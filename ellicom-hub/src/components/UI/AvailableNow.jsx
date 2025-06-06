import React from 'react';

const AvailableNow = () => {
  return (
    <div className=" w-screen flex flex-col items-center justify-center">
      {/* Scaled Button */}
      <div className="-mb-14 scale-80">
        <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold text-ground">
          Available Now
        </button>
      </div>

      {/* Box Grid */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-5 w-full h-45 border-y-2 border-sea">
        <div className="w-20 h-28 rounded-lg border-2 border-sea bg-head -mb-9"></div>
        <div className="w-20 h-28 rounded-lg border-2 border-sea bg-head -mb-9"></div>
        <div className="w-20 h-28 rounded-lg border-2 border-sea bg-head -mb-9"></div>
      </div>
    </div>
  );
};

export default AvailableNow;
