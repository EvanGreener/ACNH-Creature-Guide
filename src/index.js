import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Views
import Index from './views/index'

//Global styles
import './assets/app.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);