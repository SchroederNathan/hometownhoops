import React from 'react'

function TravelTeamCard(props: any) {
    return (
        <div>
            <div className="card d-grid mb-3 overflow-hidden shadow-sm" >
                <div className="row g-0">

                    <div className="col-md-8" >
                        <div className="card-body" >

                            <h2 className="card-title mb-1"><strong>{props.name}</strong> <span className="badge text-bg-primary fs-6 align-middle">Open</span></h2>
                            <span style={{ lineHeight: '40px' }} >
                                <i className="bi bi-calendar d-inline " style={{ paddingRight: '10px' }}></i>
                                <p className='d-inline '>
                                    {props.startDate}
                                    <i className="bi bi-arrow-right-short"></i>
                                    {props.endDate}
                                </p>
                            </span>
                            <br />
                            <span >
                                <i className="bi bi-geo-alt-fill d-inline" style={{ paddingRight: '10px' }}></i>
                                <p className='d-inline' >
                                    {props.location}
                                </p>
                            </span>

                            <p className="card-text mb-3 mt-1" dangerouslySetInnerHTML={{ __html: props.rules }}></p>
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

export default TravelTeamCard