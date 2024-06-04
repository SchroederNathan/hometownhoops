import React, { useEffect, useState } from 'react'
import './TravelTeams.css'
import NoEvents from '../../components/helpers/NoEvents'
import TravelTeamCard from '../../components/helpers/travel-teams/TravelTeamCard'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

const TravelTeams = () => {
  const [eventList, setEventList] = useState([{}])

  const eventCollectionRef = collection(db, "travel-teams");

  useEffect(() => {
    const getEventList = async () => {
      // READ DATA
      try {
        const data = await getDocs(eventCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEventList(filteredData)
      } catch (err) {
        console.log(err)
      }
    };

    getEventList()
  }, [])

  const showEvents = () => {
    return (
      <div className='mt-3'>
        {/* <span className="h1 d-block m-3 mb-4 text-center"><strong>Active Rec Leagues</strong></span> */}

        <span className="h1 d-block m-3 mb-2 text-center"><strong>Travel Teams</strong></span>
        <p className='w-75 text-center mx-auto mb-5 lead'>
          At Hometown Hoops, we're not just about basketball -
          we're about building better players and better people both on
          and off the court. Our travel teams are where competitive spirit
          meets personal growth. Led by dedicated coaches and staff, we
          focus on improving skills, fostering teamwork, and promoting
          leadership qualities in our players. Whether you're just starting
          out or looking for more exposure, our program is designed to help
          you reach your full potential!
        </p>
        {eventList.map((event: any) => (
          <TravelTeamCard name={event.name} location={event.location} rules={event.rules} imgSrc={event.imgUrl} startDate={event.startDate} endDate={event.endDate} />
        ))}
      </div>
    )
  }

  return (
    <div className='main-div p-3 container-fluid'>

      <div>
        {eventList ? showEvents()
          : <NoEvents title='travel-teams' />}
      </div>
    </div>
  )
}

export default TravelTeams