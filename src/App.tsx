import React from 'react'
import Nav from './components/header/Nav'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import SingUp from './auth/SingUp'
import Login from './auth/Login'
import RecLeagues from './pages/RecLeagues'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SingUp />} />
        <Route path='/rec-leagues' element={<RecLeagues />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App