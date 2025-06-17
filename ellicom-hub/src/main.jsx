import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // ✅ Required for useLocation()
import { AuthProvider } from './Context/AuthContext'; // ✅ Your Auth context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <AuthProvider> 
        <App />       
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
