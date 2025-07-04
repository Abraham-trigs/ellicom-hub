import { create } from 'zustand';
import useUserStore from './UserStore';

const useJobStore = create((set, get) => ({
  jobs: [],
  loading: false,
  error: null,

  // 🧠 Get jobs for the current user
  userJobs: () => {
    const { user, role } = useUserStore.getState();
    const { jobs } = get();

    if (!user) return [];

    switch (role) {
      case 'superadmin':
        return jobs;
      case 'admin':
      case 'staff':
        return jobs.filter((job) => job.assignedTo === user.id);
      case 'client':
        return jobs.filter((job) => job.createdBy === user.id);
      case 'guest':
        return jobs.filter((job) => job.createdBy === user?.id);
      default:
        return [];
    }
  },

  fetchJobs: async () => {
    set({ loading: true });
    try {
      const res = await fetch('http://localhost:5001/jobs');
      const data = await res.json();
      set({ jobs: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createJob: async (jobData) => {
    const { user } = useUserStore.getState();
    try {
      const response = await fetch('http://localhost:5001/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...jobData,
          createdBy: user?.id,
        }),
      });

      if (!response.ok) throw new Error('Job creation failed');

      const newJob = await response.json();
      set((state) => ({ jobs: [...state.jobs, newJob] }));
    } catch (err) {
      console.error('❌ createJob error:', err.message);
    }
  },

  updateJob: async (jobId, updates) => {
    try {
      const res = await fetch(`http://localhost:5001/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error('Failed to update job');

      const updated = await res.json();
      set((state) => ({
        jobs: state.jobs.map((j) => (j.id === jobId ? updated : j)),
      }));
    } catch (err) {
      console.error('❌ updateJob error:', err.message);
    }
  },

  deleteJob: async (jobId) => {
    try {
      const res = await fetch(`http://localhost:5001/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete job');

      set((state) => ({
        jobs: state.jobs.filter((j) => j.id !== jobId),
      }));
    } catch (err) {
      console.error('❌ deleteJob error:', err.message);
    }
  },
}));

export default useJobStore;
