import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../../assets/tournaments.jpg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// const [parentFirstName, setParentFirstName] = useState("");
// const [parentLastName, setParentLastName] = useState("");
// const [email, setEmail] = useState("");
// const [phone, setPhone] = useState("");

function MyVerticallyCenteredModal(props: any) {
  const [teamName, setTeamName] = React.useState("");
  const [captainFirstName, setCaptainFirstName] = React.useState("");
  const [captainLastName, setCaptainLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  // Function triggered when the form is submitted
  const wasSuccess = () => {
    // Call the parent callback function
    props.parentCallback(true);
  };

  const eventsCollectionRef = collection(
    db,
    `rec-leagues/${props.eventID}/registrar`
  );

  const onCreate = async () => {
    try {
      await addDoc(eventsCollectionRef, {
        teamName: teamName,
        captainFirstName: captainFirstName,
        captainLastName: captainLastName,
        phoneNumber: phoneNumber,
      });
      wasSuccess();
      props.onHide();
      // SHOW CONFIRMATIOn
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title
        className="mt-4 fs-4"
        style={{ paddingLeft: "15px", marginBottom: "0px" }}
      >9
        <strong>Register Your Team</strong>
      </Modal.Title>
      <hr className="featurette-divider" style={{ marginBottom: "0px" }} />

      <Modal.Body>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="teamName" className="form-label">
              Team Name
            </label>
            <input
              type="text"
              className="form-control"
              id="teamName"
              placeholder="Team Name"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Captain First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setCaptainFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Captain Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => setCaptainLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Cell Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={onCreate}
          className="btn btn-labeled-1 btn-primary float-end create-button"
        >
          Submit
          <span className="btn-label-1">
            <i className="bi bi-check"></i>
          </span>
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function RecLeagueCard(props: any) {
  const [modalShow, setModalShow] = React.useState(false);
  const [wasSuccess, setWasSuccess] = React.useState(false);

  // Callback function to handle data received from the
  //child component
  const handleCallback = (childData: any) => {
    // Update the name in the component's state
    setWasSuccess(childData);
    if (wasSuccess) {
      toast.success("Successfully Registered!");
      setWasSuccess(false);
    }
  };

  function checkIfOpen(time1: string, time2: Date) {
    // alert(new Date(time1) < new Date(time2))
    return new Date(time1) < new Date(time2); // true if time2 is later
  }

  return (
    <div>
      <div className="card d-grid mb-3 overflow-hidden shadow-sm">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              {checkIfOpen(props.endDate, new Date()) ? (
                <h2 className="card-title mb-1">
                  <strong>{props.name}</strong>{" "}
                  <span className="badge text-bg-primary fs-6 align-middle">
                    Closed
                  </span>
                </h2>
              ) : (
                <h2 className="card-title mb-1">
                  <strong>{props.name}</strong>{" "}
                  <span className="badge text-bg-primary fs-6 align-middle">
                    Open
                  </span>
                </h2>
              )}
              <span style={{ lineHeight: "40px" }}>
                <i
                  className="bi bi-calendar d-inline "
                  style={{ paddingRight: "10px" }}
                ></i>
                <p className="d-inline ">
                  {props.startDate}
                  <i className="bi bi-arrow-right-short"></i>
                  {props.endDate}
                </p>
              </span>
              <br />
              <span>
                <i
                  className="bi bi-geo-alt-fill d-inline"
                  style={{ paddingRight: "10px" }}
                ></i>
                <p className="d-inline">{props.location}</p>
              </span>

              <p
                className="card-text mb-3 mt-1"
                dangerouslySetInnerHTML={{ __html: props.rules }}
              ></p>
              {props.isDashboard ? (
                <Link to={props.eventID}>
                  <a className="btn btn-primary w-100">Edit League</a>
                </Link>
              ) : checkIfOpen(props.endDate, new Date()) ? (
                // Make it navigate to seperate page
                <Link to={`/rec-leagues/${props.eventID}`}>
                  <a className="btn btn-primary w-100">View Details</a>
                </Link>
              ) : (
                <a
                  onClick={() => setModalShow(true)}
                  className="btn btn-primary w-100"
                >
                  Register Your Team
                </a>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <img
              src="/src/assets/tournaments.jpg"
              className="img-fluid h-100 object-fit-cover  "
              alt="..."
            />
            {/* <p className="card-text"><small className="text-body-secondary position-absolute bottom-0 end-0">Posted 3 mins ago</small></p> */}
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        eventID={props.eventID}
        show={modalShow}
        parentCallback={handleCallback}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default RecLeagueCard;
