import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from '../store/UserStore';
import useJobStore from '../store/JobStore';
import CTSideBar from '../UI/CTSideBar';
import Head from '../UI/Head';

const JobDetails = () => {
  const { role, user } = useUserStore();
  const { jobs, fetchJobs } = useJobStore();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!jobs.length) await fetchJobs();
      const found = jobs.find((j) => j.id === id);
      setJob(found || null);
    };
    load();
  }, [id, jobs, fetchJobs]);

  if (!user || !role) {
    return <p className="text-red-500 text-center mt-10">Unauthorized. You must be logged in.</p>;
  }

  if (!job) {
    return <p className="text-coHead text-center mt-10 text-xl">Loading job details...</p>;
  }

  return (
    <>
      <div className='border-gold border-b-1 h-23 mb-5'>
        <div className=" mt-10 flex flex-col justify-end">
          <div className="w-full ">
            <div className=' flex flex-row justify-end'>
              <CTSideBar />
            </div>
          </div>
        </div>

        <div className='scale-50 -mt-26'>
          <Head />
        </div>
      </div>

      <div className="w-full h-130 rounded-2xl flex flex-col items-center justify-center border-1 border-sea -mt-4">
        {/* Job Card with details */}
        <div className="-mt-10 flex flex-col justify-center items-center object-contain mb-2">
          <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold scale-75 text-Ground mb-3 object-contain">
            Job Card
          </button>

          <div className="flex flex-col justify-evenly items-center w-75 h-43 rounded-3xl border-2 bg-gold -mt-3 object-contain">
            <div className='flex flex-row justify-between items-center gap-x-2'>
              <div className="flex flex-row justify-evenly items-center gap-x-2 w-42 h-30 rounded-xl bg-highGold drop-shadow-sm shadow shadow-2xl">

                <div className='flex flex-row justify-center items-center ml-1 w-18 h-26 rounded-md bg-ground border-1 drop-shadow-sm shadow shadow-md'>
                  <div className='flex flex-col justify-evenly items-center'>
                    <div className='text-center scale-130 mb-1 border-b-2 border-b-coHead text-coHead'>
                      Size
                    </div>
                    <div className='font-extrabold text-4xl text-center text-gold '>
                      {job.size}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-3 mr-1 drop-shadow-sm shadow shadow-md'>
                  <div className='w-18 h-8 rounded-md bg-ground text-center text-coHead flex flex-row justify-center items-center font-semibold'>
                    {job.type}
                  </div>

                  <div className='flex flex-row justify-between items-center w-18 h-10 rounded-md bg-coHead'>
                    <div className='flex flex-row -ml-1 items-center w-10 h-12 rounded-md scale-75 font-bold bg-ground'>
                      <div className='mr-0.5 ml-1 text-coHead'>QTY</div>
                    </div>
                    <div className='text-center mr-1 font-bold text-red-600'>{job.quantity}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center w-30 h-25 rounded-2xl bg-highGold drop-shadow-sm shadow shadow-2xl">
                <div className='flex flex-row gap-x-2 justify-center items-center scale-90 mb-2 mt-3'>
                  <div className='w-18 h-8 rounded-md bg-container text-center text-coHead flex flex-row justify-center items-center font-semibold'>
                    {job.color}
                  </div>
                  <div className='w-18 h-8 rounded-md bg-inactive text-center flex flex-row justify-center items-center font-semibold'>
                    {job.doubleSided ? 'F/B' : 'SINGLE'}
                  </div>
                </div>

                <div className='flex flex-row gap-x-2 justify-center items-center scale-90'>
                  <div className='w-18 h-8 rounded-md bg-inactive font-bold text-center flex flex-row justify-center items-center'>
                    File
                  </div>
                  <div className='w-18 h-8 rounded-md bg-sea text-container text-center flex justify-center items-center font-bold'>
                    {job.file || 'No File'}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-row justify-evenly gap-3 scale-90'>
              <button className='bg-ground text-coHead px-4 py-1 rounded-md drop-shadow-sm shadow shadow-2xl'>check</button>
              <button className='bg-neonSea text-coHead px-4 py-1 rounded-md drop-shadow-sm shadow shadow-2xl'>save order</button>
            </div>
          </div>
        </div>

        <div className='w-50 border border-t-0.5 border-sea mb-2'></div>

        <div className='ml-2 mr-2 w-full h-70 border-2 border-inactive rounded-2xl'>
          <div className='flex flex-col justify-center items-center'>
            <button className="text flex items-center -mt-1 bg-sea rounded-b-2xl p-2 px-5 font-bold scale-90 text-Ground mb-3 object-contain">
              Job Record
            </button>
          </div>

          <div className='w-contain ml-3 mr-3 h-50 bg-contain border-2 border-high rounded-2xl p-2 text-coHead'>
            <div><strong>Job ID:</strong> {job.id}</div>
            <div><strong>Created By:</strong> {job.createdBy}</div>
            <div><strong>Assigned To:</strong> {job.assignedTo || 'Unassigned'}</div>
            <div><strong>Status:</strong> {job.status || 'Pending'}</div>
            <div><strong>Price:</strong> GH₵ {job.price}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
