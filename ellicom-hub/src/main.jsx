import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// 🧠 Create root and render React app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// 🚀 Immediately remove the preloader once app mounts (no fade)
const preloader = document.getElementById('preloader');
if (preloader) {
  preloader.remove();
}


//
// 🧭 main.jsx – React App Bootstrapper for Ellicom-hub
//
// Mounts the main App component into #root
// Wraps app with React Router (no need for AuthProvider anymore)
// Zustand handles all auth/state logic globally (no context wrapping needed)
// Instantly removes the #preloader splash after hydration
//    - Fast user experience, avoids flickers
//
