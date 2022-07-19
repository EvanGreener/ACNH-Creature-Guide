import React from 'react';
import ReactDOM from 'react-dom/client';

// Global styles
import './index.css';

// Views
import Index from './views/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>
);
