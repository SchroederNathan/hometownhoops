import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";

interface TeamsModalProps {
  show: boolean;
  onHide: () => void;
  parentCallback: (team: Team) => void;
  teamToEdit?: Team | null;
}

interface Player {
  name: string;
}

interface Team {
  id?: string;
  teamName: string;
  captainFirstName: string;
  captainLastName: string;
  phoneNumber: string;
  players: Player[];
}

const TeamsModal: React.FC<TeamsModalProps> = ({ show, onHide, parentCallback, teamToEdit }) => {
  const [teamName, setTeamName] = useState("");
  const [captainFirstName, setCaptainFirstName] = useState("");
  const [captainLastName, setCaptainLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [players, setPlayers] = useState<Player[]>([{ name: "" }]);

  useEffect(() => {
    if (teamToEdit) {
      setTeamName(teamToEdit.teamName);
      setCaptainFirstName(teamToEdit.captainFirstName);
      setCaptainLastName(teamToEdit.captainLastName);
      setPhoneNumber(teamToEdit.phoneNumber);
      setPlayers(teamToEdit.players);
    } else {
      setTeamName("");
      setCaptainFirstName("");
      setCaptainLastName("");
      setPhoneNumber("");
      setPlayers([{ name: "" }]);
    }
  }, [teamToEdit]);

  const handleSubmit = () => {
    parentCallback({
      id: teamToEdit?.id,
      teamName,
      captainFirstName,
      captainLastName,
      phoneNumber,
      players,
    });
    onHide();
  };

  const addPlayer = () => {
    setPlayers([...players, { name: "" }]);
  };

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = value;
    setPlayers(newPlayers);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Title className="mt-4 fs-4" style={{ paddingLeft: "15px", marginBottom: "0px" }}>
        <strong>{teamToEdit ? "Edit Team" : "Add Team"}</strong>
      </Modal.Title>
      <hr className="featurette-divider" style={{ marginBottom: "0px" }} />
      <Modal.Body>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="teamName" className="form-label">Team Name</label>
            <input
              type="text"
              className="form-control"
              id="teamName"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Captain First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={captainFirstName}
              onChange={(e) => setCaptainFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Captain Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={captainLastName}
              onChange={(e) => setCaptainLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Cell Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <hr />
          <h5>Players</h5>
          {players.map((player, index) => (
            <div key={index} className="mb-3">
              <label className="form-label">Player {index + 1}</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Player Name"
                value={player.name}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addPlayer}>
            Add Player
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={handleSubmit} className="btn btn-labeled-1 btn-primary float-end create-button">
          Submit
          <span className="btn-label-1">
            <i className="bi bi-check"></i>
          </span>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamsModal;
