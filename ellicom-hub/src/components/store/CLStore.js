// src/stores/useLoginStore.js
import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

const useCLStore = create((set, get) => ({
  name: '',
  password: '',
  isLoggedIn: false,

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
      alert('Invalid credentials. Try again.');
    }
  },

  reset: () => set({ name: '', password: '', isLoggedIn: false }),
}));

export default useCLStore;
