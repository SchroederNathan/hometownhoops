import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import TeamsModal from './TeamsModal';
import { v4 as uuidv4 } from 'uuid';

const TeamsCreateRecLeague = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const name = state.name;
  const location = state.location;
  const startDate = state.startDate;
  const endDate = state.endDate;
  const rules = state.rules;

  const [modalShow, setModalShow] = useState(false);
  const [teams, setTeams] = useState([
    { id: uuidv4(), name: 'Monstars', playerCount: 7 },
    { id: uuidv4(), name: 'Tune Squad', playerCount: 7 },
    { id: uuidv4(), name: 'Tropics', playerCount: 7 },
  ]);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editedTeamName, setEditedTeamName] = useState('');
  const [editedPlayerCount, setEditedPlayerCount] = useState(0);

  function preview(event, tabName) {
    event.preventDefault();
    if (tabName === 'info') {
      navigate("/dashboard/rec-leagues/create", { state: { name, location, startDate, endDate, rules } });
    } else if (tabName === 'preview') {
      navigate("/dashboard/rec-leagues/create/preview", {
        state: {
          name,
          location,
          startDate,
          endDate,
          rules,
        },
      });
    }
  }

  const addTeam = () => {
    const newTeam = { id: uuidv4(), name: 'New Team', playerCount: 0 }; // Add your logic for new team details here
    setTeams([...teams, newTeam]);
  };

  const removeTeam = (id) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const startEditing = (team) => {
    setEditingTeamId(team.id);
    setEditedTeamName(team.name);
    setEditedPlayerCount(team.playerCount);
  };

  const saveEdits = (id) => {
    setTeams(teams.map(team => (
      team.id === id ? { ...team, name: editedTeamName, playerCount: editedPlayerCount } : team
    )));
    setEditingTeamId(null);
  };

  const cancelEdits = () => {
    setEditingTeamId(null);
  };

  return (
    <div>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item" style={{ marginRight: "2px" }}>
          <a
            className="nav-link tab activeTab"
            onClick={(event) => preview(event, 'info')}
            href="#"
          >
            Information
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active tab"
            href="#"
          >
            Teams
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link tab"
            onClick={(event) => preview(event, 'preview')}
            href="#"
          >
            Preview
          </a>
        </li>
      </ul>

      <button type="button" className="btn btn-teams" onClick={addTeam}>
        <span className="btn-label-teams">
          <i className="bi bi-people-fill"></i>
        </span>
        Add Team
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Team Name</th>
            <th scope="col" className='text-center'>Player Count</th>
            <th scope="col" className='text-center'>Edit Players</th>
            <th scope="col" className='text-center'>Remove Team</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>
                {editingTeamId === team.id ? (
                  <input
                    type="text"
                    value={editedTeamName}
                    onChange={(e) => setEditedTeamName(e.target.value)}
                  />
                ) : (
                  team.name
                )}
              </td>
              <td className='text-center'>
                {editingTeamId === team.id ? (
                  <input
                    type="number"
                    value={editedPlayerCount}
                    onChange={(e) => setEditedPlayerCount(parseInt(e.target.value))}
                  />
                ) : (
                  team.playerCount
                )}
              </td>
              <td scope="row" className="text-center">
                <div className="d-flex justify-content-center">
                  {editingTeamId === team.id ? (
                    <>
                      <button className="btn btn-success" onClick={() => saveEdits(team.id)}>Save</button>
                      <button className="btn btn-secondary" onClick={cancelEdits}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={() => startEditing(team)}>Edit Team</button>
                  )}
                </div>
              </td>
              <td scope="row" className="text-center">
                <div className="d-flex justify-content-center">
                  <button className="btn btn-danger" onClick={() => removeTeam(team.id)}>
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

      <TeamsModal
        // eventID={props.eventID}
        show={modalShow}
        // parentCallback={handleCallback}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default TeamsCreateRecLeague;
