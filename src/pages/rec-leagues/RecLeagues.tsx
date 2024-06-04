import React, { useEffect, useState } from "react";
import "./RecLeagues.css";
import NoEvents from "../../components/helpers/NoEvents";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import RecLeagueCard from "../../components/helpers/rec-leagues/RecLeagueCard";
import toast, { Toaster } from "react-hot-toast";

const RecLeagues = () => {
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
        {/* <span className="h1 d-block m-3 mb-4 text-center"><strong>Active Rec Leagues</strong></span> */}

        <span className="h1 d-block m-3 mb-2 text-center">
          <strong>Rec Leagues</strong>
        </span>
        <p className="w-75 text-center mx-auto mb-5 lead">
          Hometown Hoops Rec Basketball Leagues offer a unique opportunity for
          basketball lovers of all skill levels to stay active, connect with
          others, and have fun on the court. Our leagues provide a competitive
          yet welcoming environment that emphasizes community building and
          sportsmanship. Join us for a season of fun and competition with
          Hometown Hoops Rec Basketball Leagues!
        </p>
        {eventList.map((event: any) => (
          <RecLeagueCard
            name={event.name}
            location={event.location}
            rules={event.rules}
            imgSrc={event.imgUrl}
            startDate={event.startDate}
            endDate={event.endDate}
            eventID={event.id}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="main-div p-3 container-fluid">
      <div>{eventList ? showEvents() : <NoEvents title="Rec Leagues" />}</div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default RecLeagues;
