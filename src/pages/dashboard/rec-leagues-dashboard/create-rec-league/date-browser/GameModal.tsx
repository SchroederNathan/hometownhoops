import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Team } from '../teams/TeamsCreateRecLeague'; // Adjust the import path accordingly
import { Game } from './DateBrowser';

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

const GameModal: React.FC<GameModalProps> = ({
    show,
    onHide,
    selectedDate,
    teams,
    addGame,
    editGame,
    isEditing,
    gameToEdit
}) => {
    const [awayTeam, setAwayTeam] = useState('');
    const [homeTeam, setHomeTeam] = useState('');

    const [time, setTime] = useState('');

    useEffect(() => {
        if (isEditing && gameToEdit) {
            setAwayTeam(gameToEdit.awayTeam);
            setHomeTeam(gameToEdit.homeTeam);
            setTime(gameToEdit.gameDate.toTimeString().substring(0, 5)); // assuming time is in hh:mm format
        } else {
            setAwayTeam('');
            setHomeTeam('');
            setTime('');
        }
    }, [isEditing, gameToEdit]);

    const handleAddGame = () => {
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
                <Form.Group className="mb-3">
                    <Form.Label>Away Team</Form.Label>
                    <Form.Select
                        value={awayTeam}
                        onChange={(e) => setAwayTeam(e.target.value)}
                    >
                        <option value="">Select Away Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.name}>{team.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Home Team</Form.Label>
                    <Form.Select
                        value={homeTeam}
                        onChange={(e) => setHomeTeam(e.target.value)}
                    >
                        <option value="">Select Home Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.name}>{team.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddGame}>
                    {isEditing ? 'Edit Game' : 'Add Game'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GameModal;