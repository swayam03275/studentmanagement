import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            padding: '14px 20px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(99, 102, 241, 0.1)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f1f5f9',
            },
            style: {
              border: '1px solid rgba(16, 185, 129, 0.3)',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#f1f5f9',
            },
            style: {
              border: '1px solid rgba(244, 63, 94, 0.3)',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
