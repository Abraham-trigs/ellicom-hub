import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCLStore from '../store/CLStore';

const CLForm = () => {
  const { name, password, setName, setPassword, login } = useCLStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(navigate); // <- redirect if credentials match
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-2xl shadow-lg space-y-6"
      >

        <div>
          <label htmlFor="name" className="block text-sm text-center font-medium text-head mb-1">
            
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border-b-2 text-center border-inactive text-head focus:outline-none focus:ring-2 focus:ring-sea"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-center text-head mb-1">
            
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border-b-2 text-center border-inactive text-head focus:outline-none focus:ring-2 focus:ring-sea"
          />
        </div>

        <div className='flex flex-col items-center justify-center  mt-20'>
          <button
            type="submit"
            className="flex p-6 bg-sea hover:bg-high text-ground font-bold py-2 rounded-lg transition-all ease-in-out duration-200"
            >
            Enter
          </button>

        </div>    
      </form>
    </div>
  );
};

export default CLForm;
