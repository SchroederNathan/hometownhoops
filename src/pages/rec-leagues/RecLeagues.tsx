import React, { useEffect, useState } from "react";
import "./RecLeagues.css";
import NoEvents from "../../components/helpers/NoEvents";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import RecLeagueCard from "../../components/helpers/rec-leagues/RecLeagueCard";
import toast, { Toaster } from "react-hot-toast";

const RecLeagues = () => {
  const [eventList, setEventList] = useState([{}]);
  const [loading, setLoading] = useState(true); // State to track loading

  const eventCollectionRef = collection(db, "rec-leagues");

  useEffect(() => {
    const getEventList = async () => {
      try {
        const data = await getDocs(eventCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setEventList(filteredData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getEventList();
  }, []);

  const now = new Date();

  const openRegistrationLeagues = eventList.filter((event: any) => {
    const deadline = new Date(event.deadline);
    deadline.setHours(deadline.getHours() + 27, 59, 59);
    console.log(deadline);

    return now < deadline;
  });

  const activeLeagues = eventList.filter((event: any) => {
    const startDate = new Date(event.deadline);
    startDate.setHours(startDate.getHours() + 27, 59, 59);
    const endDate = new Date(event.endDate);
    endDate.setHours(endDate.getHours() + 4);

    return startDate < now && now <= endDate;
  });

  const pastLeagues = eventList.filter((event: any) => {
    const endDate = new Date(event.endDate);
    endDate.setHours(endDate.getHours() + 4);

    return now > endDate;
  });

  const showEvents = (title: string, leagues: any[]) => (
    <div className="mt-3">
      <span className="h1 d-block mb-3">{title}</span>
      {leagues.length === 0
        ? null
        : leagues.map((event: any) => (
            <RecLeagueCard
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

  return (
    <div className="main-div p-3 container-fluid">
      <span className="h1 d-block m-3 mb-2 text-center">
        <strong>Rec Leagues</strong>
      </span>
      <p className="w-75 text-center mx-auto mb-2 lead">
        Hometown Hoops Rec Basketball Leagues offer a unique opportunity for
        basketball lovers of all skill levels to stay active, connect with
        others, and have fun on the court. Our leagues provide a competitive yet
        welcoming environment that emphasizes community building and
        sportsmanship. Join us for a season of fun and competition with Hometown
        Hoops Rec Basketball Leagues!
      </p>
      <div
        className="mb-3"
        style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
      >
        <hr className="featurette-divider" />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {openRegistrationLeagues.length > 0 ? (
            <>
              {showEvents("Open Registration", openRegistrationLeagues)}
              <div
                className="mb-3"
                style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
              >
                <hr className="featurette-divider" />
              </div>
            </>
          ) : null}
          {activeLeagues.length > 0 ? (
            <>
              {showEvents("Active Leagues", activeLeagues)}
              <div
                className="mb-3"
                style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
              >
                <hr className="featurette-divider" />
              </div>
            </>
          ) : null}
          {pastLeagues.length > 0 ? (
            <>
              {showEvents("Past Leagues", pastLeagues)}
              <div
                className="mb-3"
                style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
              >
                <hr className="featurette-divider" />
              </div>
            </>
          ) : null}

          {activeLeagues.length <= 0 &&
          openRegistrationLeagues.length <= 0 &&
          pastLeagues.length <= 0 ? (
            <NoEvents title="No Events" />
          ) : null}
        </div>
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default RecLeagues;
