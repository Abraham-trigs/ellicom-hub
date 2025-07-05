// src/store/JobCardStore.js

import { create } from 'zustand';

const useJobCardStore = create((set) => ({
  // 📌 Core Job Data
  jobType: '',
  paperSize: 'A4',
  quantity: '',
  color: 'Black',
  colorType: null,
  sideType: 'Front', // ✅ Default now explicitly 'Front'
  fileAttached: false,

  // 📌 Modal States
  isJobTypeModalOpen: false,
  isPaperSizeModalOpen: false,
  isQuantityModalOpen: false,

  // 📌 Setters
  setJobType: (type) => set({ jobType: type }),
  setPaperSize: (size) => set({ paperSize: size }),
  setQuantity: (qty) => set({ quantity: qty }),
  setColor: (color) => set({ color }),
  attachFile: () => set({ fileAttached: true }),
  detachFile: () => set({ fileAttached: false }),

  // 📌 Color selection
  setColorType: (type) => set({ colorType: type }),

  // 📌 Side selection (✅ updated logic)
  setSideType: (value) => set({ sideType: value }),
  toggleSideType: () =>
    set((state) => ({
      sideType: state.sideType === 'Front & Back' ? 'Front' : 'Front & Back',
    })),

  // 📌 Modal Controls
  toggleModal: () =>
    set((state) => ({
      isJobTypeModalOpen: !state.isJobTypeModalOpen,
    })),
  openModal: () => set({ isJobTypeModalOpen: true }),
  closeModal: () => set({ isJobTypeModalOpen: false }),

  openPaperSizeModal: () => set({ isPaperSizeModalOpen: true }),
  closePaperSizeModal: () => set({ isPaperSizeModalOpen: false }),

  openQuantityModal: () => set({ isQuantityModalOpen: true }),
  closeQuantityModal: () => set({ isQuantityModalOpen: false }),

  // 📌 Reset entire form
  resetJobCard: () =>
    set({
      jobType: '',
      paperSize: 'A4',
      quantity: '',
      color: 'Black',
      colorType: null,
      sideType: 'Front', // ✅ also reset to 'Front'
      fileAttached: false,
      isJobTypeModalOpen: false,
      isPaperSizeModalOpen: false,
      isQuantityModalOpen: false,
    }),
}));

export default useJobCardStore;
