import { useParams } from "react-router-dom";
import "./LeagueDetails.css";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { League } from "../RecLeagueModel";
import { checkIfOpen } from "../../../components/helpers/Functions";

const LeagueDetails = () => {
  const { eventID } = useParams();

  const [event, setEvent] = useState({});

  //db.collection('books').where(firebase.firestore.FieldPath.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5').get()

  useEffect(() => {
    const getEvent = async () => {
      // READ DATA
      try {
        const docRef = doc(db, "rec-leagues", eventID!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvent(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getEvent();
  }, [eventID]);

  return (
    <div className="container-fluid details-main mb-3">
      {checkIfOpen(event.endDate, new Date()) ? (
        <h2 className="card-title mb-1 mt-3">
          <strong>{event.name}</strong>{" "}
          <span className="badge text-bg-primary fs-6 align-middle">
            Closed
          </span>
        </h2>
      ) : (
        <h2 className="card-title mb-1 mt-3">
          <strong>{event.name}</strong>{" "}
          <span className="badge text-bg-primary fs-6 align-middle">Open</span>
        </h2>
      )}
      <span style={{ lineHeight: "40px" }}>
        <i
          className="bi bi-calendar d-inline "
          style={{ paddingRight: "10px" }}
        ></i>
        <p className="d-inline ">
          {event.startDate}
          <i className="bi bi-arrow-right-short"></i>
          {event.endDate}
        </p>
      </span>
      <br />
      <span>
        <i
          className="bi bi-geo-alt-fill d-inline"
          style={{ paddingRight: "10px" }}
        ></i>
        <p className="d-inline">{event.location}</p>
      </span>
      <p
        className="card-text mb-3 mt-1"
        dangerouslySetInnerHTML={{ __html: event.rules }}
      ></p>
    </div>
  );
};

export default LeagueDetails;
