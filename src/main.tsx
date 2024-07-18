import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './custom.scss'
import './custom.css'


import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <div style={{overflowX: 'hidden'}}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </div>
)
