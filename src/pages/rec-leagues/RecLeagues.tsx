import React, { useEffect, useState } from 'react'
import './RecLeagues.css'
import NoEvents from '../../components/helpers/NoEvents'
import { db } from '../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import RecLeagueCard from '../../components/helpers/rec-leagues/RecLeagueCard'

const RecLeagues = () => {
  const [eventList, setEventList] = useState([{}])

  const eventCollectionRef = collection(db, "rec-leagues");

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
        <span className="display-5 d-block m-3 mb-4 text-center"><strong>Active Rec Leagues</strong></span>

        <span className="display-5 d-block m-3 mb-4 text-center"><strong>Open Registration</strong></span>
        {eventList.map((event: any) => (
          <RecLeagueCard name={event.name} location={event.location} rules={event.rules} imgSrc={event.imgUrl} startDate={event.startDate} endDate={event.endDate} />
        ))}
      </div>
    )
  }

  return (
    <div className='main-div p-3 container-fluid'>

      <div>
        {eventList ? showEvents()
          : <NoEvents title='Rec Leagues' />}
      </div>
    </div>
  )
}

export default RecLeagues