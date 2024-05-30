import React from 'react'
import './PreviewCreateTravelTeam.css'
import { useLocation, useNavigate } from 'react-router-dom'



const PreviewCreateTravelTeam = () => {
    const { state } = useLocation();

    const name = state.name;
    const location = state.location;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const rules = state.rules;

    const navigate = useNavigate();

    function preview(event: any) {
        event.preventDefault();
        
        navigate("/dashboard/travel-teams/create",
            {
                state: {
                    name,
                    location,
                    startDate,
                    endDate,
                    rules
                }
            }
        );
        
    }


    return (
        <div>
            <ul className="nav nav-tabs mb-3 ">
                <li className="nav-item">
                    <a className="nav-link tab" onClick={(event) => preview(event)} aria-current="page" href="#">Information</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link tab active" href="#">Preview</a>
                </li>
            </ul>
            <div className="card d-grid mb-3 overflow-hidden shadow-sm" >
                <div className="row g-0">

                    <div className="col-md-8" >
                        <div className="card-body" >

                            <h2 className="card-title mb-1"><strong>{name}</strong></h2>
                            <span style={{lineHeight: '40px'}} >
                                <i className="bi bi-calendar d-inline " style={{ paddingRight: '10px' }}></i>
                                <p className='d-inline '>
                                    {startDate}
                                    <i className="bi bi-arrow-right-short"></i>
                                    {endDate}
                                </p>
                            </span>
                            <br />
                            <span >
                                <i className="bi bi-geo-alt-fill d-inline" style={{ paddingRight: '10px' }}></i>
                                <p className='d-inline' >
                                    {location}
                                </p>
                            </span>

                            <p className="card-text mb-3 mt-1" dangerouslySetInnerHTML={{ __html: rules }}></p>
                            <a href="#" className="btn btn-primary w-100">Register your child here</a>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <img src="/src/assets/tournaments.jpg" className="img-fluid h-100 object-fit-cover  " alt="..." />
                        {/* <p className="card-text"><small className="text-body-secondary position-absolute bottom-0 end-0">Posted 3 mins ago</small></p> */}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PreviewCreateTravelTeam