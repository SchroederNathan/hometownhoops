import './TravelTeamsDashboard.css'
import React from 'react'

const TravelTeamsDashboard = () => {
    return (
        <div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <button type="button" className="btn btn-labeled btn-primary float-end">
                    <span className="btn-label"><i className="bi bi-plus "></i></span>
                    Create
                </button>
            </div>
            <div className="card d-grid mb-3" style={{ maxWidth: "540px", overflowX: 'hidden' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="/src/assets/hometownhoopslogo.png" className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="/src/assets/hometownhoopslogo.png" className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelTeamsDashboard