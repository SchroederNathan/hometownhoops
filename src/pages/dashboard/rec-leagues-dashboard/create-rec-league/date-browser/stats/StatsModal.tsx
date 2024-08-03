import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Game } from "../DateBrowser";
import StatsGrid from "./EditStats";
import { PlayerStats } from "../../../Models";

interface StatsModalProps {
  show: boolean;
  onHide: () => void;
  game?: Game;
  initialStats: PlayerStats[];
  onSave: (updatedStats: PlayerStats[], updatedWinner: string) => Promise<void>;
  initialWinner: string;
  isUserView?: boolean;
}

const StatsModal: React.FC<StatsModalProps> = ({
  show,
  onHide,
  game,
  onSave,
  initialStats,
  initialWinner,
  isUserView = false,
}) => {
  const [stats, setStats] = useState<PlayerStats[]>(initialStats);
  const [winner, setWinner] = useState<string>(initialWinner);


  useEffect(() => {
    setStats(initialStats);
    setWinner(initialWinner);
  }, [initialStats, initialWinner]);

  const handleSave = () => {
    onSave(stats, winner);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} className="modal-lg" centered>
      <Modal.Header closeButton>
        {isUserView ? (
          <Modal.Title>Player Stats</Modal.Title>
        ) : (
          <Modal.Title>Edit Stats</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {isUserView ? (
          <StatsGrid
            game={game}
            stats={stats}
            winner={winner}
            isUserView={isUserView}
          />
        ) : (
          <StatsGrid
            game={game}
            stats={stats}
            onStatsChange={setStats}
            winner={winner}
            onWinnerChange={setWinner}
          />
        )}
      </Modal.Body>
      {isUserView ? null : (
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default StatsModal;
