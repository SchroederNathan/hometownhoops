import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../../assets/tournaments.jpg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function RegisterModal(props: any) {
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
    `rec-leagues/${props.eventID}/teams`
  );

  const onCreate = async () => {
    try {
      await addDoc(eventsCollectionRef, {
        name: teamName,
        captainFirstName,
        captainLastName,
        phoneNumber,
        players: [], // Initialize with an empty players array
      });
      props.parentCallback(true);
      props.onHide();
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
      >
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

  // Callback function to handle data received from the child component
  const handleCallback = (childData: any) => {
    setWasSuccess(childData);
    if (wasSuccess) {
      toast.success("Successfully Registered!");
      setWasSuccess(false);
    }
  };

  // Check if registration is open by comparing the deadline date with the current date
  function checkIfRegistrationOpen(time1: Date, time2: Date) {
    time1.setHours(time1.getHours() + 27, 59, 59);
    return time1 > time2; // true if time2 is later
  }

  const isBeforeDeadline = checkIfRegistrationOpen(
    new Date(props.deadline),
    new Date()
  );

  const navigate = useNavigate();

  const openDetails = (eventID: string, isDashboard?: boolean) => {
    if (isDashboard) {
      navigate(`/dashboard/rec-leagues/${eventID}`, {
        state: {
          hasProps: true,
          name: props.name,
          imgURL: props.imgURL,
          eventID,
          location: props.location,
          deadline: props.deadline,
          startDate: props.startDate,
          endDate: props.endDate,
          rules: props.rules,
          teams: props.teams,
          games: props.games,
        },
      });
    } else {
      navigate(`/rec-leagues/${eventID}`, {
        state: {
          hasProps: true,
          name: props.name,
          imgURL: props.imgURL,
          eventID,
          location: props.location,
          deadline: props.deadline,
          startDate: props.startDate,
          endDate: props.endDate,
          rules: props.rules,
          teams: props.teams,
          games: props.games,
        },
      });
    }
  };

  console.log(props);

  return (
    <div>
      <div className="card d-grid mb-3 overflow-hidden shadow-sm">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title mb-1">
                <strong>{props.name}</strong>{" "}
                <span className="badge text-bg-primary fs-6 align-middle">
                  {isBeforeDeadline ? "Open" : "Closed"}
                </span>
              </h2>
              <span style={{ lineHeight: "40px" }}>
                <i
                  className="bi bi-calendar d-inline "
                  style={{ paddingRight: "10px" }}
                ></i>
                <p className="d-inline ">
                  {isBeforeDeadline ? (
                    props.deadline
                  ) : props.startDate && props.endDate ? (
                    <>
                      {props.startDate}
                      <i className="bi bi-arrow-right-short"></i>
                      {props.endDate}
                    </>
                  ) : null}
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
                <a
                  onClick={() => openDetails(props.eventID, props.isDashboard)}
                  className="btn btn-primary w-100"
                >
                  Edit League
                </a>
              ) : // <Link to={props.eventID}>
              //   <a className="btn btn-primary w-100">Edit League</a>
              // </Link>
              isBeforeDeadline ? (
                <a
                  onClick={() => setModalShow(true)}
                  className="btn btn-primary w-100"
                >
                  Register Your Team
                </a>
              ) : (
                <a
                  onClick={() => openDetails(props.eventID)}
                  className="btn btn-primary w-100"
                >
                  View Details
                </a>
                // <Link to={`/rec-leagues/${props.eventID}`}>
                //   <a className="btn btn-primary w-100">View Details</a>
                // </Link>
              )}
            </div>
          </div>
          <div className="col-md-4">
            {props.imgUrl != "none" ? (
              <img
                src={props.imgUrl}
                className="img-fluid h-100 object-fit-cover  "
                alt="..."
              />
            ) : (
              <img
                src="/src/assets/tournaments.jpg"
                className="img-fluid h-100 object-fit-cover  "
                alt="..."
              />
            )}
          </div>
        </div>
      </div>
      <RegisterModal
        eventID={props.eventID}
        show={modalShow}
        parentCallback={handleCallback}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default RecLeagueCard;
