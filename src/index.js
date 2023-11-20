import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider'
import { PaymentProcessorProvider } from './context/PaymentProcessorProvider'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PaymentProcessorProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PaymentProcessorProvider>
  </React.StrictMode>
);
