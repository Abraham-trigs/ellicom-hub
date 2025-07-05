import { create } from 'zustand';

const useJobCardStore = create(set => ({
  jobType: '',
  paperSize: 'A4',
  quantity: 50,
  color: 'Black',
  side: 'F / B',
  fileAttached: false,

  isJobTypeModalOpen: false,

  // Setters
  setJobType: (type) => set({ jobType: type }),
  setPaperSize: (size) => set({ paperSize: size }),
  setQuantity: (qty) => set({ quantity: qty }),
  setColor: (color) => set({ color }),
  setSide: (side) => set({ side }),
  attachFile: () => set({ fileAttached: true }),
  detachFile: () => set({ fileAttached: false }),

  // Modal Controls
  toggleModal: () => set(state => ({ isJobTypeModalOpen: !state.isJobTypeModalOpen })),
  openModal: () => set({ isJobTypeModalOpen: true }),
  closeModal: () => set({ isJobTypeModalOpen: false }),

  // Reset to default
  resetJobCard: () => set({
    jobType: '',
    paperSize: 'A4',
    quantity: 50,
    color: 'Black',
    side: 'F / B',
    fileAttached: false,
    isJobTypeModalOpen: false,
  })
}));

export default useJobCardStore;
