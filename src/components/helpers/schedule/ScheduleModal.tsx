
import { Scheduler } from '@aldabil/react-scheduler';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';


export function ScheduleModal(props: any) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Title className='mt-4 fs-4' style={{ paddingLeft: '15px', marginBottom: '0px' }}>
                <strong>Edit Schedule</strong>
            </Modal.Title>

            <hr className="featurette-divider" style={{ marginBottom: '0px' }} />

            <Modal.Body>
                    <Scheduler view="month"
                        day={null}
                        
                        data-overlay="false"
                        month={{
                            weekDays: [0, 1, 2, 3, 4, 5],
                            weekStartOn: 6,
                            startHour: 16,
                            endHour: 24
                        }}
                        week={null}
                        
                         />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={props.onHide} style={{ width: '108px' }} className="btn btn-labeled-1 btn-primary float-end create-button">
                    Save
                    <span className="btn-label-1"><i className="bi bi-check"></i></span>
                </button>
            </Modal.Footer>
        </Modal>
    );
}


