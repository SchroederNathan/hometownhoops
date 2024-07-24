import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Team } from "../teams/TeamsCreateRecLeague"; // Adjust the import path accordingly
import { Game } from "./DateBrowser";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore"; // Import Firestore functions
import { db } from "../../../../../config/firebase"; // Adjust the import path accordingly
import { useParams } from "react-router-dom";

interface GameModalProps {
  show: boolean;
  onHide: () => void;
  selectedDate: Date;
  teams: Team[];
  addGame: (awayTeam: string, homeTeam: string, time: string) => void;
  editGame: (awayTeam: string, homeTeam: string, time: string) => void;
  isEditing: boolean;
  isEditingLeague: boolean;
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
  isEditingLeague,
  gameToEdit,
}) => {
  const [awayTeam, setAwayTeam] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [time, setTime] = useState("");

  const { eventID } = useParams();

  useEffect(() => {
    if (isEditing && gameToEdit) {
      setAwayTeam(gameToEdit.awayTeam);
      setHomeTeam(gameToEdit.homeTeam);
      setTime(gameToEdit.gameDate.toTimeString().substring(0, 5)); // assuming time is in hh:mm format
    } else {
      setAwayTeam("");
      setHomeTeam("");
      setTime("");
    }
  }, [isEditing, gameToEdit]);

  const saveEdits = async () => {
    if (!gameToEdit?.gameID) return;
    try {
      const gameRef = doc(
        db,
        "rec-leagues",
        eventID!,
        "games",
        gameToEdit.gameID
      );
      const [hours, minutes] = time.split(":");
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(parseInt(hours));
      updatedDate.setMinutes(parseInt(minutes));

      await updateDoc(gameRef, {
        awayTeam,
        homeTeam,
        gameDate: updatedDate,
      });
      console.log("Game updated successfully!");
    } catch (error) {
      console.error("Error updating game: ", error);
    }
  };

  // Add game to DB
  const addGameToDB = async () => {
    try {
      const [hours, minutes] = time.split(":");
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours));
      newDate.setMinutes(parseInt(minutes));

      const gameRef = collection(db, "rec-leagues", eventID!, "games");

      const gameData = {
        awayTeam,
        homeTeam,
        gameDate: newDate,
        winner: "",
      };

      // Add the game to the database and get the document reference
      const gameDocRef = await addDoc(gameRef, gameData);

      // Create the stats collection within the newly added game document
      const statsCollectionRef = collection(gameDocRef, "stats");

      // Add documents for each player in the stats collection
      teams.forEach((team) => {
        if (team.name === awayTeam || team.name === homeTeam) {
          team.players.forEach((player) => {
            // create a document reference for the stats collection that includes the player's ID
            const statDocRef = doc(statsCollectionRef, player.id);

            const playerStatDoc = {
              playerID: player.id,
              playerName: player.name,
              teamName: team.name,
              points: 0,
              assists: 0,
              rebounds: 0,
            };
            
            console.log(playerStatDoc)
            setDoc(statDocRef, playerStatDoc);
          });
        }
      });

      console.log("Game and stats added successfully!");
    } catch (error) {
      console.error("Error adding game: ", error);
    }
  };

  const handleAddGame = () => {
    if (awayTeam && homeTeam && time) {
      if (isEditing) {
        if (!isEditingLeague) {
          editGame(awayTeam, homeTeam, time);
        } else {
          saveEdits();
        }
      } else {
        if (!isEditingLeague) {
          addGame(awayTeam, homeTeam, time);
        } else {
          addGameToDB();
        }
      }
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Game" : "Add Game"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="form-label mb-3 fw-bold">
          {selectedDate.toDateString()}
        </label>
        <Form.Group className="mb-3">
          <Form.Label>Away Team</Form.Label>
          <Form.Select
            key={awayTeam}
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
          >
            <option value="">Select Away Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Home Team</Form.Label>
          <Form.Select
            key={homeTeam}
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          >
            <option value="">Select Home Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
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
          {isEditing ? "Save" : "Add Game"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameModal;
