import { addDoc, collection } from "firebase/firestore";
import { Modal } from "react-bootstrap";
import { db } from "../../../../../config/firebase";
import React from "react";

function TeamsModal(props: any) {
    const [teamName, setTeamName] = React.useState("");
    const [captainFirstName, setCaptainFirstName] = React.useState("");
    const [captainLastName, setCaptainLastName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
  
    // Function triggered when the form is submitted
    const wasSuccess = () => {
      // Call the parent callback function
      props.parentCallback(true);
    };
  
    // const eventsCollectionRef = collection(
    //   db,
    //   `rec-leagues/${props.eventID}/registrar`
    // );
  
    // const onCreate = async () => {
    //   try {
    //     await addDoc(eventsCollectionRef, {
    //       teamName: teamName,
    //       captainFirstName: captainFirstName,
    //       captainLastName: captainLastName,
    //       phoneNumber: phoneNumber,
    //     });
    //     wasSuccess();
    //     props.onHide();
    //     // SHOW CONFIRMATIOn
    //   } catch (err) {
    //     alert(err);
    //   }
    // };
  
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
          <strong>Edit Teams</strong>
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
            // onClick={onCreate}
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

  export default TeamsModal;