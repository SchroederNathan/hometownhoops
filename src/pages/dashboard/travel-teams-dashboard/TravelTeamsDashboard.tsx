import { Link } from 'react-router-dom'
import './TravelTeamsDashboard.css'
import React from 'react'
import TravelTeamCard from './create-travel-team/preview/TravelTeamCard'

const TravelTeamsDashboard = () => {
    return (
        <div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
                <Link to='create'>
                    <button type="button" className="btn btn-labeled btn-primary float-end create-button">
                        <span className="btn-label"><i className="bi bi-plus "></i></span>
                        Create
                    </button>
                </Link>
            </div>
            <div className='card-view overflow-auto'>
                <TravelTeamCard />
                <TravelTeamCard />
                <TravelTeamCard />

            </div>
        </div>
    )
}

export default TravelTeamsDashboard