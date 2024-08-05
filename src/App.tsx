import Footer from './components/footer/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import SingUp from './auth/SingUp'
import Login from './auth/Login'
import RecLeagues from './pages/rec-leagues/RecLeagues'
import NotFound from './components/error/NotFound'
import Tournaments from './pages/tournaments/Tournaments'
import TravelTeams from './pages/travel-teams/TravelTeams'
import Dashboard from './pages/dashboard/Dashboard'
import TravelTeamsDashboard from './pages/dashboard/travel-teams-dashboard/TravelTeamsDashboard'
import CreateTravelTeam from './pages/dashboard/travel-teams-dashboard/create-travel-team/CreateTravelTeam'
import PreviewCreateTravelTeam from './pages/dashboard/travel-teams-dashboard/create-travel-team/preview/PreviewCreateTravelTeam'
import RecLeaguesDashboard from './pages/dashboard/rec-leagues-dashboard/RecLeaguesDashboard'
import CreateRecLeague from './pages/dashboard/rec-leagues-dashboard/create-rec-league/CreateRecLeague'
import PreviewCreateRecLeague from './pages/dashboard/rec-leagues-dashboard/create-rec-league/preview/PreviewCreateRecLeague'
import TournamentsDashboard from './pages/dashboard/tournaments-dashboard/TournamentsDashboard'
import CreateTournament from './pages/dashboard/tournaments-dashboard/create-tournament/CreateTournaments'
import PreviewCreateTournament from './pages/dashboard/tournaments-dashboard/preview-tournament/PreviewCreateTournament'
import LeagueDetails from './pages/rec-leagues/details/LeagueDetails'
import EditLeagueDetails from './pages/dashboard/rec-leagues-dashboard/edit/EditLeagueDetails'
import TeamsCreateRecLeague from './pages/dashboard/rec-leagues-dashboard/create-rec-league/teams/TeamsCreateRecLeague'
import NavBar from './components/header/Nav'
import EmailDashboard from './pages/dashboard/email/EmailDashboard'



const App = () => {
  return (
    <div >
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} errorElement={<NotFound />} /> 
        <Route path='/login' element={<Login />} errorElement={<NotFound />} />
        <Route path='/signup' element={<SingUp />} errorElement={<NotFound />} />
        <Route path='/tournaments' element={<Tournaments />} errorElement={<NotFound />} />
        <Route path='/travel-teams' element={<TravelTeams />} errorElement={<NotFound />} />
        <Route path='/rec-leagues' element={<RecLeagues />} errorElement={<NotFound />} />
        <Route path="/rec-leagues/:eventID" element={<LeagueDetails />} errorElement={<NotFound/>} />

        <Route path='/dashboard' element={<Dashboard />} errorElement={<NotFound />}>
          <Route index element={<Navigate to="travel-teams" replace />} />

          <Route path="travel-teams" element={<TravelTeamsDashboard />} />
          <Route path="travel-teams/create" element={<CreateTravelTeam />} />
          <Route path="travel-teams/create/preview" element={<PreviewCreateTravelTeam />} />

          <Route path="rec-leagues" element={<RecLeaguesDashboard />} />
          <Route path="rec-leagues/:eventID" element={<EditLeagueDetails />} errorElement={<NotFound/>} />
          <Route path="rec-leagues/:eventID/teams" element={<TeamsCreateRecLeague isEditing={true} />} />


          <Route path="rec-leagues/create" element={<CreateRecLeague />} />
          <Route path="rec-leagues/create/teams" element={<TeamsCreateRecLeague isEditing={false} />} />
          <Route path="rec-leagues/create/preview" element={<PreviewCreateRecLeague />} />

          <Route path="tournaments" element={<TournamentsDashboard />} />
          <Route path="tournaments/create" element={<CreateTournament />} />
          <Route path="tournaments/create/preview" element={<PreviewCreateTournament />} />

          <Route path="email" element={<EmailDashboard />} />

        </Route>
      </Routes>

      <Footer />
    </div>
  )
}

export default App