import React, { useEffect, useState } from "react";
import "./RecLeagues.css";
import NoEvents from "../../components/helpers/NoEvents";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import RecLeagueCard from "../../components/helpers/rec-leagues/RecLeagueCard";
import toast, { Toaster } from "react-hot-toast";

const RecLeagues = () => {
  const [eventList, setEventList] = useState<any[]>([]);

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
    const now = new Date();

    const openRegistrationEvents = eventList.filter((event: any) => {
      const deadlineDate = new Date(event.deadline);
      console.log(deadlineDate >= now);
      return deadlineDate >= now;
    });

    console.log(eventList);

    const activeLeagues = eventList.filter((event: any) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      return startDate <= now && endDate >= now;
    });

    const pastLeagues = eventList.filter((event: any) => {
      const endDate = new Date(event.endDate);
      return endDate < now;
    });

    return (
      <div className="mt-3">
        <span className="h1 d-block m-3 mb-2 text-center">
          <strong>Rec Leagues</strong>
        </span>
        <p className="w-75 text-center mx-auto mb-2 lead">
          Hometown Hoops Rec Basketball Leagues offer a unique opportunity for
          basketball lovers of all skill levels to stay active, connect with
          others, and have fun on the court. Our leagues provide a competitive
          yet welcoming environment that emphasizes community building and
          sportsmanship. Join us for a season of fun and competition with
          Hometown Hoops Rec Basketball Leagues!
        </p>
        <div
          className="mb-3"
          style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
        >
          <hr className="featurette-divider" />
        </div>

        {openRegistrationEvents.length > 0 && (
          <>
            <span className="h1 d-block mb-3">Open Registration</span>
            {openRegistrationEvents.map((event: any) => (
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
            <div
              className="mb-3"
              style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
            >
              <hr className="featurette-divider" />
            </div>
          </>
        )}

        {activeLeagues.length > 0 && (
          <>
            <span className="h1 d-block mb-3">Active Leagues</span>
            {activeLeagues.map((event: any) => (
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
            <div
              className="mb-3"
              style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
            >
              <hr className="featurette-divider" />
            </div>
          </>
        )}

        {pastLeagues.length > 0 && (
          <>
            <span className="h1 d-block mb-3">Past Leagues</span>
            {pastLeagues.map((event: any) => (
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
            <div
              className="mb-3"
              style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}
            >
              <hr className="featurette-divider" />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="main-div p-3 container-fluid">
      <div>
        {eventList.length > 0 ? showEvents() : <NoEvents title="Rec Leagues" />}
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default RecLeagues;
