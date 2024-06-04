import React from 'react'
import './PreviewCreateTournament.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TournamentCard from '../../../../components/helpers/tournaments/TournamentCard';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../config/firebase';




const PreviewCreateTournament= () => {
    const { state } = useLocation();

    const name = state.name;
    const location = state.location;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const rules = state.rules;
    // const selectedImage = state.selectedImage;

    const eventsCollectionRef = collection(db, 'tournaments')

    const onCreate = async () => {
        try {
            await addDoc(eventsCollectionRef, {
                name: name,
                location: location,
                startDate: startDate,
                endDate: endDate,
                imgUrl: 'none',
                rules: rules
            })
            navigate("/dashboard/tournaments/")
        } catch (err) {
            alert(err)
        }

    }


    const navigate = useNavigate();

    function preview(event: any) {
        event.preventDefault();

        navigate("/dashboard/tournaments/create",
            {
                state: {
                    name,
                    location,
                    startDate,
                    endDate,
                    rules
                }
            }
        );
    }

    return (
        <div>
            <ul className="nav nav-tabs mb-3 ">
                <li className="nav-item">
                    <a className="nav-link tab" onClick={(event) => preview(event)} aria-current="page" href="#">Information</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link tab active" href="#">Preview</a>
                </li>
            </ul>

            <TournamentCard name={name} location={location} startDate={startDate} endDate={endDate} rules={rules} />

            <Link to='../travel-teams'>
                <button type="button" className="btn btn-labeled btn-danger ">
                    <span className="btn-label"><i className="bi bi-x"></i></span>
                    Cancel
                </button>
            </Link>
            <button type="button" className="btn btn-labeled-1 btn-primary float-end create-button" onClick={onCreate}>
                Create
                <span className="btn-label-1"><i className="bi bi-check"></i></span>
            </button>

        </div>
    )
}

export default PreviewCreateTournament