import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TeamsModal from "./TeamsModal";
import { v4 as uuidv4 } from "uuid";
import { doc, writeBatch, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../config/firebase";

interface Player {
  id?: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  captainFirstName?: string;
  captainLastName?: string;
  phoneNumber?: string;
  players: Player[];
  playerCount: number;
  wins?: number;
  losses?: number;
}

interface TeamsCreateRecLeagueProps {
  isEditing: boolean;
}

const TeamsCreateRecLeague: React.FC<TeamsCreateRecLeagueProps> = ({
  isEditing,
}) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const eventID = state.eventID;
  const name = state.name;
  const location = state.location;
  const deadline = state.deadline;
  const startDate = state.startDate;
  const endDate = state.endDate;
  const rules = state.rules;
  const games = state.games || [];

  const [modalShow, setModalShow] = useState(false);
  const [teams, setTeams] = useState<Team[]>(state.teams || []);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [teamsToDelete, setTeamsToDelete] = useState<string[]>([]);

  const preview = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    tabName: string
  ) => {
    event.preventDefault();
    if (tabName === "info") {
      navigate("/dashboard/rec-leagues/create", {
        state: { name, location, deadline, startDate, endDate, rules, teams, games },
      });
    } else if (tabName === "preview") {
      navigate("/dashboard/rec-leagues/create/preview", {
        state: {
          name,
          location,
          deadline,
          startDate,
          endDate,
          rules,
          teams,
          games,
        },
      });
    } else if (tabName === "edit") {
      navigate(`/dashboard/rec-leagues/${eventID}`, {
        state: {
          hasProps: true,
          name,
          location,
          deadline,
          startDate,
          endDate,
          rules,
          teams,
          games,
        },
      });
    }
  };

  const addOrEditTeam = (team: Team) => {
    if (team.id) {
      // Edit existing team
      setTeams(
        teams.map((t) =>
          t.id === team.id ? { ...team, playerCount: team.players.length } : t
        )
      );
    } else {
      // Add new team
      const newTeam = {
        ...team,
        id: uuidv4(),
        players: team.players.map((player) => ({ ...player, id: uuidv4() })),
        playerCount: team.players.length,
      };
      setTeams([...teams, newTeam]);
    }
    setTeamToEdit(null);
    setModalShow(false);
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
    setTeamsToDelete([...teamsToDelete, id]);
  };

  const editTeam = (team: Team) => {
    setTeamToEdit(team);
    setModalShow(true);
  };

  const onUpdate = async () => {
    try {
      const batch = writeBatch(db);

      teams.forEach((team) => {
        const teamRef = doc(db, "rec-leagues", eventID, "teams", team.id);
        batch.set(teamRef, team);

        team.players.forEach((player) => {
          const playerRef = doc(teamRef, "players", player.id!);
          batch.set(playerRef, player);
        });
      });

      for (const teamId of teamsToDelete) {
        const teamRef = doc(db, "rec-leagues", eventID, "teams", teamId);
        batch.delete(teamRef);
      }

      await batch.commit();
      console.log("Teams updated successfully!");
      navigate(`/dashboard/rec-leagues/${eventID}`, {
        state: {
          hasProps: true,
          name,
          location,
          deadline,
          startDate,
          endDate,
          rules,
          teams,
          games,
        },
      });
    } catch (error) {
      console.error("Error updating teams: ", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item" style={{ marginRight: "2px" }}>
            <a
              className="nav-link tab activeTab"
              onClick={(event) => preview(event, "edit")}
              href="#"
            >
              Information
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active tab" href="#">
              Teams
            </a>
          </li>
        </ul>
      ) : (
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item" style={{ marginRight: "2px" }}>
            <a
              className="nav-link tab activeTab"
              onClick={(event) => preview(event, "info")}
              href="#"
            >
              Information
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active tab" href="#">
              Teams
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link tab"
              onClick={(event) => preview(event, "preview")}
              href="#"
            >
              Preview
            </a>
          </li>
        </ul>
      )}

      <button
        type="button"
        className="btn btn-teams"
        onClick={() => setModalShow(true)}
      >
        <span className="btn-label-teams">
          <i className="bi bi-plus"></i>
        </span>
        Create Team
      </button>
      <TeamsModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setTeamToEdit(null);
        }}
        parentCallback={addOrEditTeam}
        teamToEdit={teamToEdit}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Team Name</th>
            <th scope="col" className="text-center">
              Player Count
            </th>
            <th scope="col" className="text-center">
              Edit Players
            </th>
            <th scope="col" className="text-center">
              Remove Team
            </th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td className="text-center">{team.players.length}</td>
              <td scope="row" className="text-center">
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => editTeam(team)}
                  >
                    Edit Team
                  </button>
                </div>
              </td>
              <td scope="row" className="text-center">
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTeam(team.id)}
                  >
                    <span>
                      <i className="bi bi-x"></i>
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing ? (
        <button
          type="button"
          className="btn btn-labeled-1 btn-primary float-end create-button mt-3"
          onClick={onUpdate}
        >
          Update
          <span className="btn-label-1">
            <i className="bi bi-check"></i>
          </span>
        </button>
      ) : null}
    </div>
  );
};

export default TeamsCreateRecLeague;
