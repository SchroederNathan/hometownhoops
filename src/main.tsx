import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'

import './index.css'
import './custom.scss'

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav/Nav.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Nav/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
