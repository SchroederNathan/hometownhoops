import React from 'react'
import Nav from './components/header/Nav'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App