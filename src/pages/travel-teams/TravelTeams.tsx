import React from 'react'
import './TravelTeams.css'
import NoEvents from '../../components/helpers/NoEvents'
import TravelTeamCard from '../../components/helpers/travel-teams/TravelTeamCard'

const TravelTeams = () => {
  return (
    <div className='main-div p-3'>
      <TravelTeamCard/>
            {/* <NoEvents title='Travel Teams'/> */}
    </div>
  )
}

export default TravelTeams