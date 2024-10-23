import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { ScrollProvider } from './context/ScrollProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ScrollProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ScrollProvider>
);