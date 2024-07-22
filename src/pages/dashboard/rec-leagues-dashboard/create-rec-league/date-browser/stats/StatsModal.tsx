import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Team } from '../../teams/TeamsCreateRecLeague';
import { Game } from '../DateBrowser';
import EditStats from './EditStats';

interface GameModalProps {
    show: boolean;
    onHide: () => void;
    // selectedDate: Date;
    // teams: Team[];
    // addGame: (awayTeam: string, homeTeam: string, time: string) => void;
    // editGame: (awayTeam: string, homeTeam: string, time: string) => void;
    // isEditing: boolean;
    // gameToEdit?: Game;
}

const StatsModal: React.FC<GameModalProps> = ({
    show,
    onHide,
    // selectedDate,
    // teams,
    // addGame,
    // editGame,
    // isEditing,
    // gameToEdit
}) => {
    // const [awayTeam, setAwayTeam] = useState('');
    // const [homeTeam, setHomeTeam] = useState('');

    // const [time, setTime] = useState('');

    // useEffect(() => {
    //     if (isEditing && gameToEdit) {
    //         setAwayTeam(gameToEdit.awayTeam);
    //         setHomeTeam(gameToEdit.homeTeam);
    //         setTime(gameToEdit.gameDate.toTimeString().substring(0, 5)); // assuming time is in hh:mm format
    //     } else {
    //         setAwayTeam('');
    //         setHomeTeam('');
    //         setTime('');
    //     }
    // }, [isEditing, gameToEdit]);

    // const handleAddGame = () => {
    //     if (awayTeam && homeTeam && time) {
    //         if (isEditing) {
    //             editGame(awayTeam, homeTeam, time);
    //         } else {
    //             addGame(awayTeam, homeTeam, time);
    //         }
    //         onHide();
    //     }
    // };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Stats</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 <label className="form-label mb-3 fw-bold">Teams</label> 

                <EditStats />
                <label className="form-label mb-3 mt-3 fw-bold">Players</label> 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                {/* <Button variant="primary" onClick={handleAddGame}>
                    {isEditing ? 'Confirm Changes' : 'Add Game'}
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
};

export default StatsModal;