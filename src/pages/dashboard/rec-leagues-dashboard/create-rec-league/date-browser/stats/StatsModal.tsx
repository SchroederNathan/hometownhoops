import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Team } from '../../teams/TeamsCreateRecLeague';
import { Game } from '../DateBrowser';
import EditStats from './EditStats';
import StatsGrid from './EditStats';

interface GameModalProps {
    show: boolean;
    onHide: () => void;
    game?: Game;
}

const StatsModal: React.FC<GameModalProps> = ({
    show,
    onHide,
    game,
}) => {

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Stats</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <StatsGrid game={game} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StatsModal;