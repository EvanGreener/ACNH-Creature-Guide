import React from 'react'
import ReactDOM from 'react-dom/client'

// Global styles
import './index.css'

// Views
import Main from './views/Main'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
)
