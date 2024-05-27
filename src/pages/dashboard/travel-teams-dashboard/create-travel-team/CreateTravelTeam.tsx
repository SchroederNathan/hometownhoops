import React from 'react'
import './CreateTravelTeam.css'
import { Link } from 'react-router-dom'

const CreateTravelTeam = () => {
    return (
        <div>
            {/* TODO: MAKE THIS DELETE FORM DATA */}
            <Link to='../travel-teams'>
                <button type="button" className="btn btn-labeled btn-danger">
                    <span className="btn-label"><i className="bi bi-x"></i></span>
                    Cancel
                </button>
            </Link>
        </div>
    )
}

export default CreateTravelTeam