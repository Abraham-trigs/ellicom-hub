// src/stores/useLoginStore.js
import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

const useCLStore = create((set, get) => ({
  
  // login
  name: '',
  password: '',
  isLoggedIn: false,

  // search
  Job: '',
  JobID:'',
  AdminJobID: '',
  StaffJobID: '',
  ClientJobID: '',
  GuestJobID: '',
  UserType: '',

  setJobID: (JobID) => set({ JobID }),
  setUserType: (UserType) => set({ UserType}),

  // set Job Id types 


  setName: (name) => set({ name }),
  setPassword: (password) => set({ password }),

  login: (navigate) => {
    const { name, password } = get();
    const validName = 'abraham';
    const validPassword = '123456';

    if (name === validName && password === validPassword) {
      set({ isLoggedIn: true });
      navigate('/home');
    } else {
      alert('Invalid Job-ID. Try again.');
    }
  },

// correct the recommend way of import an object as an array into "const UserType = `'{JobList}'`;" 

  JobSearch: (Search) => {
    const { JobID, UserType } = get();
    const ValidUserType = 'UserType';
    const ValidJobID = 'JobList';

// needs to define Search here "isLoggedIn"
    if (JobID === ValidJobID && UserType === ValidUserType) {
      set({ isLoggedIn: true });
      navigate('/home');
    } else {
      alert('Invalid Job-ID. Try again.');
    }
  },

}));

  

export default useCLStore;
