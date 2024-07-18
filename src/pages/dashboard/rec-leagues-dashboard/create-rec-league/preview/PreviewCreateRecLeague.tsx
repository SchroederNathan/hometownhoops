import React from 'react'
import './PreviewCreateRecLeague.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import RecLeagueCard from '../../../../../components/helpers/rec-leagues/RecLeagueCard';
import { addDoc, collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../../../../config/firebase';

// Define interfaces for the data structures
interface Player {
    name: string;
}

interface Team {
    id: string;
    teamName: string;
    players: Player[];
    playerCount: number;
}


const PreviewCreateRecLeague: React.FC = () => {
    const { state } = useLocation();

    const name = state.name;
    const location = state.location;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const rules = state.rules;
    const teams = state.teams || [];

    const eventsCollectionRef = collection(db, 'rec-leagues');


    const navigate = useNavigate();


    const onCreate = async () => {
        try {
            // Initialize Firestore batch
            const batch = writeBatch(db);

            // Create the main rec-league document
            const recLeagueRef = doc(collection(db, 'rec-leagues'));
            batch.set(recLeagueRef, {
                name: name,
                location: location,
                startDate: startDate,
                endDate: endDate,
                imgUrl: 'none',
                rules: rules,
            });

            // Add teams and players as subcollections
            teams.forEach((team: Team) => {
                const teamRef = doc(collection(recLeagueRef, 'teams'), team.id);
                batch.set(teamRef, {
                    name: team.teamName,
                    playerCount: team.players.length,
                });

                // Add players to the teams subcollection
                team.players.forEach((player, index) => {
                    const playerRef = doc(collection(teamRef, 'players'), `player${index + 1}`);
                    batch.set(playerRef, {
                        name: player.name,
                    });
                });
            });

            // Commit the batch
            await batch.commit();

            // Navigate to the dashboard
            navigate("/dashboard/rec-leagues/");
        } catch (err) {
            alert(err);
        }
    };

    const preview = (event: any, tabName: string) => {
        event.preventDefault();

        if (tabName === 'info') {
            navigate("/dashboard/rec-leagues/create", { state: { name, location, startDate, endDate, rules, teams } });
        } else if (tabName === 'teams') {
            navigate("/dashboard/rec-leagues/create/teams", {
                state: {
                    name,
                    location,
                    startDate,
                    endDate,
                    rules,
                    teams
                },
            });
        }
    };

    return (
        <div>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <a className="nav-link tab" onClick={(event) => preview(event, 'info')} aria-current="page" href="#">Information</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link tab" onClick={(event) => preview(event, 'teams')} href="#">
                        Teams
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link tab active" href="#">Preview</a>
                </li>
            </ul>

            <RecLeagueCard name={name} location={location} startDate={startDate} endDate={endDate} rules={rules} />

            <Link to='../travel-teams'>
                <button type="button" className="btn btn-labeled btn-danger">
                    <span className="btn-label"><i className="bi bi-x"></i></span>
                    Cancel
                </button>
            </Link>
            <button type="button" className="btn btn-labeled-1 btn-primary float-end create-button" onClick={onCreate}>
                Create
                <span className="btn-label-1"><i className="bi bi-check"></i></span>
            </button>
        </div>
    );
};

export default PreviewCreateRecLeague;
