import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Game } from '../DateBrowser';
import StatsGrid from './EditStats';
import { PlayerStats } from '../../../Models';

interface StatsModalProps {
    show: boolean;
    onHide: () => void;
    game?: Game;
    initialStats: PlayerStats[];
    onSave: (updatedStats: PlayerStats[], updatedWinner: string) => Promise<void>;
    initialWinner: string;
}

const StatsModal: React.FC<StatsModalProps> = ({
    show,
    onHide,
    game,
    onSave,
    initialStats,
    initialWinner,
}) => {
    const [stats, setStats] = useState<PlayerStats[]>(initialStats);
    const [winner, setWinner] = useState<string>(initialWinner);

    useEffect(() => {
        setStats(initialStats);
        setWinner(initialWinner);
    }, [initialStats, initialWinner]);

    const handleSave = () => {
        onSave(stats, winner);
        console.log(onSave);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} className='modal-lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Stats</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StatsGrid game={game} stats={stats} onStatsChange={setStats} winner={winner} onWinnerChange={setWinner} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StatsModal;