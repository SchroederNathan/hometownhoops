import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Team {
    id: string;
    teamName: string;
}

interface Game {
    date: Date;
    awayTeam: string;
    homeTeam: string;
}

interface GameModalProps {
    show: boolean;
    onHide: () => void;
    selectedDate: Date;
    teams: Team[];
    addGame: (awayTeam: string, homeTeam: string, time: string) => void;
    editGame: (awayTeam: string, homeTeam: string, time: string) => void;
    isEditing: boolean;
    gameToEdit?: Game;
}

const GameModal: React.FC<GameModalProps> = ({ show, onHide, selectedDate, teams, addGame, editGame, isEditing, gameToEdit }) => {
    const [awayTeam, setAwayTeam] = useState('');
    const [homeTeam, setHomeTeam] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (isEditing && gameToEdit) {
            setAwayTeam(gameToEdit.awayTeam);
            setHomeTeam(gameToEdit.homeTeam);
            setTime(gameToEdit.date.toTimeString().substring(0, 5)); // Extracting time in HH:MM format
        } else {
            setAwayTeam('');
            setHomeTeam('');
            setTime('');
        }
    }, [isEditing, gameToEdit]);

    const handleSave = () => {
        if (awayTeam && homeTeam && time) {
            if (isEditing) {
                editGame(awayTeam, homeTeam, time);
            } else {
                addGame(awayTeam, homeTeam, time);
            }
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Game' : 'Add Game'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="form-label mb-3 fw-bold">{selectedDate.toDateString()}</label>
                <div className="mb-3">
                    <label className="form-label">Away Team</label>
                    <select
                        className="form-select"
                        value={awayTeam}
                        onChange={(e) => setAwayTeam(e.target.value)}
                    >
                        <option value="" disabled>Select Away Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.teamName}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Home Team</label>
                    <select
                        className="form-select"
                        value={homeTeam}
                        onChange={(e) => setHomeTeam(e.target.value)}
                    >
                        <option value="" disabled>Select Home Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.teamName}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input
                        type="time"
                        className="form-control"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {isEditing ? 'Save Changes' : 'Add Game'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GameModal;
