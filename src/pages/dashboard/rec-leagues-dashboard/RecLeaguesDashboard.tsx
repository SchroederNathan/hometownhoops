import { Link } from "react-router-dom";
import "./RecLeaguesDashboard.css";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import RecLeagueCard from "../../../components/helpers/rec-leagues/RecLeagueCard";
import NoEvents from "../../../components/helpers/NoEvents";
import { db } from "../../../config/firebase";

const RecLeaguesDashboard = () => {
  const [eventList, setEventList] = useState([{}]);

  const eventCollectionRef = collection(db, "rec-leagues");

  useEffect(() => {
    const getEventList = async () => {
      // READ DATA
      try {
        const data = await getDocs(eventCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEventList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getEventList();
  }, []);

  const showEvents = () => {
    return (
      <div className="mt-3">
        {/* <span className="display-5 d-block m-3 mx-auto">Rec League Events</span> */}
        {eventList.map((event: any) => (
          <RecLeagueCard
            isDashboard={true}
            key={event.id}
            name={event.name}
            location={event.location}
            rules={event.rules}
            imgSrc={event.imgUrl}
            deadline={event.deadline}
            startDate={event.startDate}
            endDate={event.endDate}
            eventID={event.id}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
        <Link to="create">
          <button
            type="button"
            className="btn btn-labeled btn-primary float-end create-button"
          >
            <span className="btn-label">
              <i className="bi bi-plus "></i>
            </span>
            Create
          </button>
        </Link>
      </div>
      <div className="card-view overflow-auto">
        <div>{eventList ? showEvents() : <NoEvents title="Rec Leagues" />}</div>
      </div>
    </div>
  );
};

export default RecLeaguesDashboard;
