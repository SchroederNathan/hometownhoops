import React, { useEffect, useState } from 'react'
import './Tournaments.css'
import NoEvents from '../../components/helpers/NoEvents'
import TournamentCard from '../../components/helpers/tournaments/TournamentCard'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

const Tournaments = () => {
  const [eventList, setEventList] = useState([{}])

  const eventCollectionRef = collection(db, "tournaments");

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

        <span className="h1 d-block m-3 mb-2 text-center"><strong>Tournaments</strong></span>
        <p className='w-75 text-center mx-auto mb-5 lead'>Find information about upcoming basketball tournaments for players of all skill levels. Our tournaments offer a competitive and fun environment to improve skills and connect with others in the community. We offer a variety of tournaments, including youth, adult, cash prize, and 4-on-4 tournaments. Don't miss out on the chance to register and join the action!</p>
        {eventList.map((event: any) => (
          <TournamentCard name={event.name} location={event.location} rules={event.rules} imgSrc={event.imgUrl} startDate={event.startDate} endDate={event.endDate} />
        ))}
      </div>
    )
  }

  return (
    <div className='main-div p-3 container-fluid'>

      <div>
        {eventList ? showEvents()
          : <NoEvents title='Tournaments' />}
      </div>
    </div>
  )
}

export default Tournaments