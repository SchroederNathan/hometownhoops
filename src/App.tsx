import React from 'react'
import Nav from './components/header/Nav'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import SingUp from './auth/SingUp'
import Login from './auth/Login'
import RecLeagues from './pages/rec-leagues/RecLeagues'
import NotFound from './components/error/NotFound'
import Tournaments from './pages/tournaments/Tournaments'
import TravelTeams from './pages/travel-teams/TravelTeams'
import Dashboard from './pages/dashboard/Dashboard'


const App = () => {
  return (
    <div >
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} errorElement={<NotFound/>} />
        <Route path='/login' element={<Login />}  errorElement={<NotFound/>}/>
        <Route path='/signup' element={<SingUp />} errorElement={<NotFound/>}/>
        <Route path='/tournaments' element={<Tournaments />} errorElement={<NotFound/>}/>
        <Route path='/travel-teams' element={<TravelTeams />} errorElement={<NotFound/>}/>
        <Route path='/rec-leagues' element={<RecLeagues />} errorElement={<NotFound/>}/>
        <Route path='/admin' element={<Dashboard />} errorElement={<NotFound/>}/>


      </Routes>
      <Footer />
    </div>
  )
}

export default App