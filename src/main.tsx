import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './custom.scss'

import { BrowserRouter} from 'react-router-dom'
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='main'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </React.StrictMode>,
)
