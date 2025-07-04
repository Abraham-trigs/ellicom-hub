import { create } from 'zustand';

const useJobStore = create((set, get) => ({
  // 🔁 Job state
  jobs: [],
  loading: false,
  error: null,

  // 🔁 Fetch all jobs from backend
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('http://localhost:5001/jobs');
      const data = await res.json();
      set({ jobs: data });
    } catch (err) {
      console.error('❌ Job fetch failed:', err);
      set({ error: 'Failed to fetch jobs' });
    } finally {
      set({ loading: false });
    }
  },

  // ➕ Create a new job
  createJob: async (jobData) => {
    set({ loading: true });
    try {
      const res = await fetch('http://localhost:5001/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      const newJob = await res.json();
      if (!res.ok) throw new Error(newJob.error || 'Failed to create job');

      set((state) => ({ jobs: [...state.jobs, newJob] }));
      return newJob;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ✏️ Update a job
  updateJob: async (jobId, updates) => {
    set({ loading: true });
    try {
      const res = await fetch(`http://localhost:5001/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const updatedJob = await res.json();
      if (!res.ok) throw new Error(updatedJob.error || 'Failed to update job');

      set((state) => ({
        jobs: state.jobs.map((j) => (j.id === jobId ? updatedJob : j)),
      }));
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ❌ Delete a job
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
      console.error('Delete error:', err.message);
    }
  },

  // 🧠 Role-aware selectors
  getJobsByUser: (userId) =>
    get().jobs.filter((job) => job.userId === userId),

  getJobsAssignedToStaff: (staffId) =>
    get().jobs.filter((job) => job.assignedTo === staffId),

  getPendingJobs: () =>
    get().jobs.filter((job) => job.status === 'pending'),

  getCompletedJobs: () =>
    get().jobs.filter((job) => job.status === 'completed'),

  getJobById: (id) =>
    get().jobs.find((job) => job.id === id),
}));

export default useJobStore;
