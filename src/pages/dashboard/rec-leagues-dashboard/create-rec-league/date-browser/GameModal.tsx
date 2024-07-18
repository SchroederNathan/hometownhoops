import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GameModalProps {
    show: boolean;
    onHide: () => void;
    selectedDate: Date;
    addGame: (awayTeam: string, homeTeam: string) => void;
}

const GameModal: React.FC<GameModalProps> = ({ show, onHide, selectedDate, addGame }) => {
    const [awayTeam, setAwayTeam] = useState('');
    const [homeTeam, setHomeTeam] = useState('');

    const handleAddGame = () => {
        if (awayTeam && homeTeam) {
            addGame(awayTeam, homeTeam);
            setAwayTeam('');
            setHomeTeam('');
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Selected Date</label>
                    <input type="text" className="form-control" value={selectedDate.toDateString()} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label">Away Team</label>
                    <input
                        type="text"
                        className="form-control"
                        value={awayTeam}
                        onChange={(e) => setAwayTeam(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Home Team</label>
                    <input
                        type="text"
                        className="form-control"
                        value={homeTeam}
                        onChange={(e) => setHomeTeam(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddGame}>
                    Add Game
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GameModal;
