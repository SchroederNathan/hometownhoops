import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { TravelTeamModal } from './TravelTeamModal';
// const [parentFirstName, setParentFirstName] = useState("");
// const [parentLastName, setParentLastName] = useState("");
// const [email, setEmail] = useState("");
// const [phone, setPhone] = useState("");

function TravelTeamCard(props: any) {



    function MyVerticallyCenteredModal(props: any) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Title className='mt-4 fs-4' style={{ paddingLeft: '15px', marginBottom: '0px' }}>
                    <strong>Register Your Children Here</strong>
                </Modal.Title>
                <hr className="featurette-divider" style={{ marginBottom: '0px' }} />

                <Modal.Body>
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Parent First Name</label>
                            <input type='text' className="form-control" id="name" placeholder='First Name' onChange={(e) => setParentFirstName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label" >Parent Last Name</label>
                            <input type='text' className="form-control" id="location" placeholder='Last Name' onChange={(e) => setParentLastName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Email</label>
                            <input type='email' className="form-control" id="location" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Cell Phone Number</label>
                            <input type='tel' className="form-control" id="location" placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={props.onHide} className="btn btn-labeled-1 btn-primary float-end create-button">
                        Submit
                        <span className="btn-label-1"><i className="bi bi-check"></i></span>
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }

    const [modalShow, setModalShow] = React.useState(false);

    function checkIfOpen(time1: string, time2: Date) {
        // alert(new Date(time1) < new Date(time2))
        return new Date(time1) < new Date(time2); // true if time2 is later
    }

    return (
        <div>
            <div className="card d-grid mb-3 overflow-hidden shadow-sm" >
                <div className="row g-0">

                    <div className="col-md-8" >
                        <div className="card-body" >

                            {checkIfOpen(props.endDate, new Date()) ?
                                <h2 className="card-title mb-1"><strong>{props.name}</strong> <span className="badge text-bg-primary fs-6 align-middle">Closed</span></h2> :
                                <h2 className="card-title mb-1"><strong>{props.name}</strong> <span className="badge text-bg-primary fs-6 align-middle">Open</span></h2>
                            }                            <span style={{ lineHeight: '40px' }} >
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
                            <a onClick={() => setModalShow(true)} className="btn btn-primary w-100">Register Your Child Here</a>
                        </div>


                    </div>
                    <div className="col-md-4">
                        <img src="/src/assets/tournaments.jpg" className="img-fluid h-100 object-fit-cover  " alt="..." />
                        {/* <p className="card-text"><small className="text-body-secondary position-absolute bottom-0 end-0">Posted 3 mins ago</small></p> */}

                    </div>

                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )

}

export default TravelTeamCard