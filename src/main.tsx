import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'

import './index.css'
import './custom.scss'

import { BrowserRouter, createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import Nav from './components/header/Nav.tsx'
import Footer from './components/footer/Footer.tsx'
import NotFound from './components/error/NotFound.tsx'
import { NavLink, Outlet } from 'react-router-dom'
import App from './App.tsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     errorElement: <NotFound />
//   },
//   {
//     path: '/tournaments',
//     element: <div>Tournaments</div>,
//     errorElement: <NotFound />
//   },
//   {
//     path: '/camps',
//     element: <div></div>,
//     errorElement: <NotFound />
//   },
//   {
//     path: '/rec-leagues',
//     element: <div></div>,
//     errorElement: <NotFound />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
