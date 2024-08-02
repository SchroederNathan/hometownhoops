import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Team } from "./TeamsCreateRecLeague";

interface TeamsModalProps {
  show: boolean;
  onHide: () => void;
  parentCallback: (team: Team) => void;
  teamToEdit?: Team | null;
}

export interface Player {
  id?: string;
  name?: string;
  points?: number;
  rebounds?: number;
  assists?: number;
}

const TeamsModal: React.FC<TeamsModalProps> = ({
  show,
  onHide,
  parentCallback,
  teamToEdit,
}) => {
  const [name, setName] = useState("");
  const [captainFirstName, setCaptainFirstName] = useState("");
  const [captainLastName, setCaptainLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [players, setPlayers] = useState<Player[]>([
    { id: uuidv4(), name: "" },
  ]);

  useEffect(() => {
    if (teamToEdit) {
      setName(teamToEdit.name);
      setCaptainFirstName(teamToEdit.captainFirstName || "");
      setCaptainLastName(teamToEdit.captainLastName || "");
      setPhoneNumber(teamToEdit.phoneNumber || "");
      setPlayers(
        teamToEdit.players.map((player) => ({
          ...player,
          id: player.id || uuidv4(),
        }))
      );
    } else {
      setName("");
      setCaptainFirstName("");
      setCaptainLastName("");
      setPhoneNumber("");
      setPlayers([{ id: uuidv4(), name: "" }]);
    }
  }, [teamToEdit]);

  const handleSubmit = () => {
    parentCallback({
      id: teamToEdit?.id || '',
      name,
      captainFirstName,
      captainLastName,
      phoneNumber,
      players,
      playerCount: players.length,
    });
    onHide();
  };

  const addPlayer = () => {
    setPlayers([...players, { id: uuidv4(), name: "" }]);
  };

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = value;
    setPlayers(newPlayers);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title
        className="mt-4 fs-4"
        style={{ paddingLeft: "15px", marginBottom: "0px" }}
      >
        <strong>{teamToEdit ? "Edit Team" : "Add Team"}</strong>
      </Modal.Title>
      <hr className="featurette-divider" style={{ marginBottom: "0px" }} />
      <Modal.Body>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Team Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Team Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Captain First Name
            </label>
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
            <label htmlFor="lastName" className="form-label">
              Captain Last Name
            </label>
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
            <label htmlFor="phone" className="form-label">
              Cell Phone Number
            </label>
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
            <div key={player.id} className="mb-3">
              <label className="form-label">Player {index + 1}</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Player Name"
                  value={player.name}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => removePlayer(index)}
                >
                  <span>
                    <i className="bi bi-x"></i>
                  </span>
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={addPlayer}>
            Add Player
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-labeled-1 btn-primary float-end create-button"
        >
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
