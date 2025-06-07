import React from 'react';
import NewJobButton from '../UI/NewJobButton';
import CTDashButton from '../UI/CTDashbutton';
import CTSideBar from '../UI/CTSideBar';

const Home = () => {
  return (
    <>
      <div className="w-full mt-10 px-4">
        {/* Flex row with button left, hamburger right */}
        <div className="flex items-center justify-between">
          <NewJobButton />
          <CTSideBar />
        </div>
      </div>

      <div className="mt-6 px-4">
        <CTDashButton />
      </div>
    </>
  );
};

export default Home;
