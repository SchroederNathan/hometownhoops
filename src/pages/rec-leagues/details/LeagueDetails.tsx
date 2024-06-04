import { useParams } from 'react-router-dom';
import './LeagueDetails.css'

const LeagueDetails = () => {
    const { eventID } = useParams();
    return (
       <div className="container-fluid details-main">
          <h1>Products Details Page - {eventID}</h1>
       </div>
    );
   
}

export default LeagueDetails;