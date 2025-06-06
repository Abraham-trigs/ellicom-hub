import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
    },
  },

  
});
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sea: '#1BD2EB',
        gold: '#F8E539',
        high: '#FFB300',
        highGold: '#FFFB72',
        ground: '#040627',
        container: '#010210',
        inactive: '#B6AE46',
        head: '#FFFFFF',
        power: '#000000',
        ellicom: {
          sea: '#1BD2EB',
          gold: '#F8E539',
          high: '#FFB300',
          highGold: '#FFFB72',
          ground: '#040627',
          container: '#010210',
          inactive: '#B6AE46',
          head: '#FFFFFF',
          power: '#000000',
        },
      },
    },
  },
  plugins: [],
};

