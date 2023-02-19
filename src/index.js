import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context';
import { ColorProviderWrapper } from './contexts/color.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ColorProviderWrapper>
          <App />
        </ColorProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
