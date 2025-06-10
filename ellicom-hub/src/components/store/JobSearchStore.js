// src/stores/useLoginStore.js
import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

const useCLStore = create((set, get) => ({
  AdminJobID: '',
  StaffJobID: '',
  ClientJobID: '',
  GuestJobID: '',


  setName: (JobID) => set({ JobID }),

  Search: (navigate) => {
    const { JobID, staffJobID, ClientJobID, GuestJobID, } = get();
    const AdminJobID = 'AllJobsList';
    const StaffJobID = 'GuestJobList';
    const ClientJobID ='ClientJobList';
    const GuestJobID = 'GuestJobList';
    const validSearch ='UserType';

    if (AdminJobID, StaffJobID, ClientJobID, GuestJobID  === validSearch && Search === valid) {
      set({ isLoggedIn: true });
      navigate('/home');
    } else {
      alert('Invalid credentials. Try again.');
    }
  },

  reset: () => set({ name: '', password: '', isLoggedIn: false }),
}));

export default useCLStore;
