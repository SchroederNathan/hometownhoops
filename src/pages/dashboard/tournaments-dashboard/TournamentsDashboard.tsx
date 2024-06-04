import { Link } from 'react-router-dom'
import './TournamentsDashboard.css'
import React, { useEffect, useState } from 'react'
import TournamentCard from '../../../components/helpers/tournaments/TournamentCard'
import NoEvents from '../../../components/helpers/NoEvents'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase'


const TournamentsDashboard = () => {
    
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
                {/* <span className="display-5 d-block m-3 mx-auto">Rec League Events</span> */}
                {eventList.map((event: any) => (
                    <TournamentCard name={event.name} location={event.location} rules={event.rules} imgSrc={event.imgUrl} startDate={event.startDate} endDate={event.endDate} />
                ))}
            </div>
        )
    }


    return (
        <div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
                <Link to='create'>
                    <button type="button" className="btn btn-labeled btn-primary float-end create-button">
                        <span className="btn-label"><i className="bi bi-plus "></i></span>
                        Create
                    </button>
                </Link>
            </div>
            <div className='card-view overflow-auto'>
                <div>
                    {eventList ? showEvents()
                        : <NoEvents title='Rec Leagues' />}
                </div>
            </div>
        </div>
    )
    
}

export default TournamentsDashboard