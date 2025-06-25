import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider , useAuth } from './Context/AuthContext';

// 🧠 Create root and render React app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// 🚀 Immediately remove the preloader once app mounts (no fade)
const preloader = document.getElementById('preloader');
if (preloader) {
  preloader.remove();
}


// main.jsx – React App Bootstrapper for Ellicom-hub
//
// ✅ Mounts the main App component into #root
// ✅ Wraps with React Router and global AuthContext provider
// ✅ Instantly removes the #preloader splash after initial hydration
//    - No transitions, prioritizes performance and responsiveness
