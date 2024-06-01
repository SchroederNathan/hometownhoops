import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';



    const [parentFirstName, setParentFirstName] = useState("");
    const [parentLastName, setParentLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    export function TravelTeamModal(props: any) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Register Your Children Here
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fs-5">Parent First Name</label>
                            <input type='text' className="form-control" id="name" placeholder='First Name' onChange={(e) => setParentFirstName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label fs-5">Parent Last Name</label>
                            <input type='text' className="form-control" id="location" placeholder='Last Name' onChange={(e) => setParentLastName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label fs-5">Email</label>
                            <input type='email' className="form-control" id="location" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label fs-5">Cell Phone Number</label>
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

