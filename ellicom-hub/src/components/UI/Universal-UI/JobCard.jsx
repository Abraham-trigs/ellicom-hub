import React from 'react';
import useUserStore from '../../store/UserStore';

const JobCard = () => {
  const { role, user } = useUserStore();

  // 📌 Default to 'guest' if role isn't set
  const userRole = role || 'guest';

  return (
    <div className="">
      {/* main Job Card with Details */}
      <div className="-mt-5 flex flex-col justify-center items-center object-contain mb-2">
        <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold scale-75 text-ground mb-3 object-contain">
          Job Card
        </button>

        {/* Job Card */}
        <div className="">
          {/* main Add Job Container */}
          <div className="flex flex-col justify-evenly items-center w-72 h-43 border-2 border-sea bg-darkSea rounded-3xl -mt-3 object-contain">
            <div className="flex flex-row justify-between items-center ml-1 mt-3">
              <div className="flex flex-row justify-between items-center gap-x-1 w-39 h-30 rounded-xl -ml-2 bg-high drop-shadow-sm shadow shadow-2xl scale-95">
                
                {/* Paper size */}
                <div className="flex flex-row justify-center items-center m-1 w-18 h-26 rounded-md bg-ground border-1 drop-shadow-sm shadow shadow-md">
                  <div className="flex flex-col justify-evenly items-center">
                    <div className="text-center scale-130 mb-1 border-b-2 border-b-coHead text-coHead">Size</div>
                    <div className="font-extrabold text-4xl text-center text-gold">A4</div>
                  </div>
                </div>

                {/* Job Type and Quantity */}
                <div className="flex flex-col gap-3 mr-2 drop-shadow-sm shadow shadow-md">
                  <div className="w-18 h-8 rounded-md bg-ground text-center text-coHead flex justify-center items-center font-semibold">
                    Job Type
                  </div>
                  <div className="flex flex-row justify-between items-center w-18 h-10 rounded-md bg-coHead">
                    <div className="flex flex-row -ml-1 items-center w-10 h-12 rounded-md scale-75 font-bold bg-ground">
                      <div className="mr-0.5 ml-1 text-coHead">QTY</div>
                    </div>
                    <div className="text-center text-2xl font-bold text-red-600 scale-90 mr-3">50</div>
                  </div>
                </div>
              </div>

              {/* Color & Option */}
              <div className="flex flex-col justify-center items-center ml-1 w-30 h-25 rounded-2xl bg-high drop-shadow-sm shadow shadow-2xl">
                <div className="flex flex-row gap-x-2 justify-center items-center scale-90 mb-2 mt-3">
                  <div className="w-18 h-8 rounded-md bg-container text-center text-coHead flex justify-center items-center font-semibold">Color</div>
                  <div className="w-18 h-8 rounded-md bg-coHead text-center flex justify-center items-center font-semibold">Black</div>
                </div>
                <div className="flex flex-row gap-x-2 justify-center items-center scale-90">
                  <div className="w-18 h-8 rounded-md bg-coHead font-bold text-center flex justify-center items-center">F / B</div>
                  <div className="w-18 h-8 rounded-md bg-green-500 text-container text-center flex justify-center items-center font-bold">
                    File <span className="font-bolder scale-120">+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Order */}
            <div className="flex flex-row justify-evenly gap-3 scale-90">
              <button className="bg-coHead hover:bg-high hover:text-container text-container px-4 py-1 font-bold rounded-md drop-shadow-sm shadow shadow-2xl">
                Save order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
