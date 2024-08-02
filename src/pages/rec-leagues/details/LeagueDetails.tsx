import { useLocation, useParams } from "react-router-dom";
import "./LeagueDetails.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { checkIfOpen } from "../../../components/helpers/Functions";
import { Team } from "../../dashboard/rec-leagues-dashboard/create-rec-league/teams/TeamsCreateRecLeague";
import { Game } from "../../dashboard/rec-leagues-dashboard/create-rec-league/date-browser/DateBrowser";
import { Player } from "../../dashboard/rec-leagues-dashboard/create-rec-league/teams/TeamsModal";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
// Row Data Interface

// Create new StatsGrid component

const StatsGrid = ({ teams, games }) => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    // Initialize rowData with teams' names and default wins and losses set to 0.
    setRowData(teams.map((team) => ({ ...team, wins: 0, losses: 0 })));

    // Ensure that teams are loaded before setting the default selected team
    if (teams.length > 0) {
      setSelectedTeam(teams[0]);
      console.log("Selected Team:", teams[0]);
    }
  }, [teams]);

  const gridRef = useRef(null);

  const onSelectionChanged = () => {
    if (gridRef.current?.api) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node: any) => node.data);
      setSelectedTeam(selectedData[0]);
    } else {
      console.log("Grid API not available");
    }
  };

  const onGridReady = (params: any) => {
    console.log("Grid is ready", params);
  };

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(teams[0]);

  const [colDefs, setColDefs] = useState<ColDef<Team>[]>([
    { field: "name", flex: 2 },
    { field: "wins", flex: 1 },
    { field: "losses", flex: 1 },
  ]);
  const defaultColDef = { flex: 1 };

  return (
    <div className="ag-theme-quartz mb-3" style={{ height: "100%" }}>
      <AgGridReact
      className="mb-3"
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        suppressCellFocus={true}
        defaultColDef={defaultColDef}
        rowSelection="single"
        onSelectionChanged={onSelectionChanged}
        onGridReady={onGridReady}
        domLayout="autoHeight"
      />

      <PlayerStats players={selectedTeam?.players} />
    </div>
  );
};

const PlayerStats = ({ players }: { players: Player[] }) => {
  const [rowData, setRowData] = useState<Player[]>(); // Initialize with players

  console.log(rowData);
  const [colDefs, setColDefs] = useState<ColDef<Player>[]>([
    { field: "name", flex: 2 },
    { field: "points", flex: 1 },
    { field: "rebounds", flex: 1 },
    { field: "assists", flex: 1 },
  ]);
  const defaultColDef = { flex: 1 };

  useEffect(() => {
    setRowData(players);
  }, [players]);

  return (
    <div className="ag-theme-quartz " style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
      />
    </div>
  );
};

const LeagueDetails = () => {
  const { eventID } = useParams();

  const [event, setEvent] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rules, setRules] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true); // State to track loading

  // Get state from navigation
  const { state } = useLocation();

  const getEvent = async () => {
    try {
      const docRef = doc(db, "rec-leagues", eventID!);
      console.log("reloaded data");

      // Grab all games from the rec-leagues collection
      const gamesCollectionRef = collection(docRef, "games");
      const gamesSnapshot = await getDocs(gamesCollectionRef);
      const gamesList = gamesSnapshot.docs.map((doc) => {
        const gameData = doc.data() as Game;
        return { ...gameData, gameID: doc.id }; // Include the document ID as gameID
      });
      setGames(gamesList);

      const teamsCollectionRef = collection(docRef, "teams");
      const teamsSnapshot = await getDocs(teamsCollectionRef);

      // Create an array to hold the teams with their players
      const teamsList: Team[] = [];

      // Iterate through each team document
      for (const teamDoc of teamsSnapshot.docs) {
        const teamData = teamDoc.data() as Team;
        const playersCollectionRef = collection(teamDoc.ref, "players");
        const playersSnapshot = await getDocs(playersCollectionRef);

        // Create an array to hold the players
        const playersList: Player[] = playersSnapshot.docs.map((playerDoc) => {
          const playerData = playerDoc.data() as Player;
          return {
            id: playerDoc.id, // Add player ID to the player object
            points: 0,
            rebounds: 0,
            assists: 0,
            ...playerData,
          };
        });

        // Add the players array to the team object
        const teamWithPlayers: Team = {
          id: teamDoc.id, // Add team ID to the team object
          wins: 0,
          losses: 0,
          ...teamData,
          players: playersList,
        };

        // Add the team object to the teams list
        teamsList.push(teamWithPlayers);
      }

      // Update state with the teams list
      setTeams(teamsList);

      // Set loading to false once data is fetched
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state && state.hasProps) {
      // If the component receives state with props, use it instead of fetching again
      setName(state.name);
      setDeadline(state.deadline);
      setStartDate(state.startDate);
      setEndDate(state.endDate);
      setLocation(state.location);
      setRules(state.rules);
      if (state.games) {
        setGames(state.games);
        setTeams(state.teams);
      } else {
        getEvent();
      }
      setLoading(false);
    } else {
    }
  }, [state]); // Run effect on mount and when state changes

  return (
    <div className="container-fluid details-main mb-3">
      {checkIfOpen(endDate, new Date()) ? (
        <h2 className="card-title mb-1 mt-3">
          <strong>{name}</strong>{" "}
          <span className="badge text-bg-primary fs-6 align-middle">
            Closed
          </span>
        </h2>
      ) : (
        <h2 className="card-title mb-1 mt-3">
          <strong>{name}</strong>{" "}
          <span className="badge text-bg-primary fs-6 align-middle">Open</span>
        </h2>
      )}
      <span style={{ lineHeight: "40px" }}>
        <i
          className="bi bi-calendar d-inline "
          style={{ paddingRight: "10px" }}
        ></i>
        <p className="d-inline ">
          {startDate}
          <i className="bi bi-arrow-right-short"></i>
          {endDate}
        </p>
      </span>
      <br />
      <span>
        <i
          className="bi bi-geo-alt-fill d-inline"
          style={{ paddingRight: "10px" }}
        ></i>
        <p className="d-inline">{location}</p>
      </span>
      <p
        className="card-text mb-3 mt-1"
        dangerouslySetInnerHTML={{ __html: rules }}
      ></p>
      <StatsGrid teams={teams} games={games} />
    </div>
  );
};

export default LeagueDetails;
