import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router, HashRouter as AppRoute } from 'react-router-dom';
import { AuthProvider } from './Components/context/AuthContext.jsx'; 
import './i18n/i18n.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoute>
      <AuthProvider>
          <App />
      </AuthProvider>
    </AppRoute>
  </StrictMode>
);
