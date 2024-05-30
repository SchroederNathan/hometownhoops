import React from 'react'
import './PreviewCreateTravelTeam.css'
import { useLocation } from 'react-router-dom'



const PreviewCreateTravelTeam = () => {
    const { state } = useLocation();

    const name = state.name;
    const location = state.location;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const rules = state.rules;


    return (

        <div>
            {name}
            {location}
            {startDate}
            {endDate}
            <div dangerouslySetInnerHTML={{ __html: rules }}>
            </div>
        </div>
    )
}

export default PreviewCreateTravelTeam