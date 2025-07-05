import { create } from 'zustand';

const useJobCardStore = create(set => ({
  jobType: '',
  paperSize: 'A4',
  quantity: '',
  color: 'Black',
  side: 'F / B',
  fileAttached: false,

  isJobTypeModalOpen: false,
  isPaperSizeModalOpen: false,
  isQuantityModalOpen: false,

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

  openPaperSizeModal: () => set({ isPaperSizeModalOpen: true }),
  closePaperSizeModal: () => set({ isPaperSizeModalOpen: false }),

  openQuantityModal: () => set({ isQuantityModalOpen: true }),
  closeQuantityModal: () => set({ isQuantityModalOpen: false }),

  // Reset to default
  resetJobCard: () => set({
    jobType: '',
    paperSize: 'A4',
    quantity: '',
    color: 'Black',
    side: 'F / B',
    fileAttached: false,
    isJobTypeModalOpen: false,
    isPaperSizeModalOpen: false,
    isQuantityModalOpen: false,
  })
}));

export default useJobCardStore;
