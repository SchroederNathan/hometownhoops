import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GameModalProps {
    show: boolean;
    onHide: () => void;
    selectedDate: Date;
    addGame: (awayTeam: string, homeTeam: string) => void;
    editGame: (awayTeam: string, homeTeam: string) => void;
    isEditing: boolean;
    gameToEdit?: { awayTeam: string; homeTeam: string };
}

const GameModal: React.FC<GameModalProps> = ({ show, onHide, selectedDate, addGame, editGame, isEditing, gameToEdit }) => {
    const [awayTeam, setAwayTeam] = useState('');
    const [homeTeam, setHomeTeam] = useState('');

    useEffect(() => {
        if (isEditing && gameToEdit) {
            setAwayTeam(gameToEdit.awayTeam);
            setHomeTeam(gameToEdit.homeTeam);
        } else {
            setAwayTeam('');
            setHomeTeam('');
        }
    }, [isEditing, gameToEdit]);

    const handleSave = () => {
        if (awayTeam && homeTeam) {
            if (isEditing) {
                editGame(awayTeam, homeTeam);
            } else {
                addGame(awayTeam, homeTeam);
            }
            setAwayTeam('');
            setHomeTeam('');
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
                <Button variant="primary" onClick={handleSave}>
                    {isEditing ? 'Save Changes' : 'Add Game'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GameModal;
