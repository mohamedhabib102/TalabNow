import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Components/context/AuthContext.jsx'; // عدّل المسار حسب مكان الملف
import './i18n/i18n.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
          <App />
      </AuthProvider>
    </Router>
  </StrictMode>
);
