// src/stores/useSLStore.js
import { create } from 'zustand';

const useSLStore = create((set, get) => ({
  name: '',
  password: '',
  isLoggedIn: false,

  setName: (name) => set({ name }),
  setPassword: (password) => set({ password }),

  login: (navigate) => {
    const { name, password } = get();
    const validName = 'staffadmin';     // You can customize these
    const validPassword = '654321';

    if (name === validName && password === validPassword) {
      set({ isLoggedIn: true });
      navigate('/Home'); 
    } else {
      alert('Access denied. Invalid credentials.');
    }
  },

  reset: () => set({ name: '', password: '', isLoggedIn: false }),
}));

export default useSLStore;
