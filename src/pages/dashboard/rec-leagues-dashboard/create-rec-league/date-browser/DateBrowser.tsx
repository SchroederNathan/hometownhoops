import React, { useEffect, useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  isSameDay,
  isWithinInterval,
  set,
} from "date-fns";
import "./DateBrowser.css"; // Ensure this file exists for custom styles
import GameModal from "./GameModal";
import { Team } from "../teams/TeamsCreateRecLeague";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
  Timestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import StatsModal from "./stats/StatsModal";
import { db } from "../../../../../config/firebase";
import { PlayerStats } from "../../Models";
import { useParams } from "react-router-dom";

export interface Game {
  gameID?: string; // Firebase document ID
  gameDate: Date;
  awayTeam: string;
  homeTeam: string;
  winner?: string;
}

interface DateBrowserProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  isEditingLeague: boolean;
  games: Game[];
  setGames: (games: Game[]) => void;
  teams: Team[]; // Added teams prop
  startDate: Date;
  endDate: Date;
}

export const fetchStats = async (gameId: string, eventID: string) => {
  try {
    // Fetch all teams and their players
    const teamCollectionRef = collection(db, "rec-leagues", eventID!, "teams");
    const teamsSnapshot = await getDocs(teamCollectionRef);

    // Create a map to easily find a player by playerID
    const playerMap = new Map();

    // Iterate through each team and their players
    for (const teamDoc of teamsSnapshot.docs) {
      const teamData = teamDoc.data();
      const playersCollectionRef = collection(teamDoc.ref, "players");
      const playersSnapshot = await getDocs(playersCollectionRef);

      playersSnapshot.docs.forEach((playerDoc) => {
        const playerData = playerDoc.data();
        playerMap.set(playerDoc.id, {
          teamID: teamDoc.id,
          teamName: teamData.name,
          playerName: playerData.name,
        });
      });
    }

    // Fetch game stats
    const gameRef = doc(db, "rec-leagues", eventID!, "games", gameId);
    const statsRef = collection(gameRef, "stats");
    const statsSnapshot = await getDocs(statsRef);

    // Attach player information to stats
    const statsList = statsSnapshot.docs.map((statDoc) => {
      const statData = statDoc.data();
      const playerInfo = playerMap.get(statData.playerID);

      return {
        ...statData,
        teamName: playerInfo?.teamName || "Unknown Team",
        playerName: playerInfo?.playerName || "Unknown Player",
      };
    });

    return statsList;
  } catch (error) {
    console.error("Error fetching stats: ", error);
    return [];
  }
};

const DateBrowser: React.FC<DateBrowserProps> = ({
  selectedDate,
  setSelectedDate,
  isEditingLeague = false,
  games,
  setGames,
  teams,
  startDate,
  endDate,
  isUserView = false,
}) => {
  const [currentWeek, setCurrentWeek] = useState(startDate);
  const [modalShow, setModalShow] = useState(false);
  const [statsModalShow, setStatsModalShow] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | undefined>(undefined);

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 0 });

  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [winner, setWinner] = useState<string>("");

  const { eventID } = useParams();

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfCurrentWeek, i);
    if (day >= startDate && day <= endDate) {
      daysOfWeek.push(day);
    }
  }

  const previousWeek = () => {
    const newWeek = subWeeks(currentWeek, 1);
    if (endOfWeek(newWeek) >= startDate) {
      setCurrentWeek(newWeek);
    }
  };

  const nextWeek = () => {
    const newWeek = addWeeks(currentWeek, 1);
    if (startOfWeek(newWeek) <= endDate) {
      setCurrentWeek(newWeek);
    }
  };

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const addGame = (awayTeam: string, homeTeam: string, time: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));

    const newGame = { gameDate: newDate, awayTeam, homeTeam };
    setGames([...games, newGame]);
  };

  const editGame = (awayTeam: string, homeTeam: string, time: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));

    const updatedGames = games.map((game) =>
      isSameDay(game.gameDate, selectedDate) &&
      game.awayTeam === gameToEdit?.awayTeam &&
      game.homeTeam === gameToEdit?.homeTeam
        ? { ...game, awayTeam, homeTeam, gameDate: newDate }
        : game
    );
    setGames(updatedGames);
    setIsEditing(false);
    setGameToEdit(undefined);
  };

  const getEvent = async () => {
    try {
      const docRef = doc(db, "rec-leagues", eventID!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Grab all games from the rec-leagues collection
        const gamesCollectionRef = collection(docRef, "games");
        const gamesSnapshot = await getDocs(gamesCollectionRef);
        const gamesList = gamesSnapshot.docs.map((doc) => {
          const gameData = doc.data() as Game;
          return { ...gameData, gameID: doc.id }; // Include the document ID as gameID
        });
        setGames(gamesList);
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Convert Firestore Timestamps to JavaScript Dates
  const convertedGames = games.map((game) => ({
    ...game,
    gameDate:
      game.gameDate instanceof Timestamp
        ? game.gameDate.toDate()
        : game.gameDate,
  }));

  const gamesOnSelectedDate = convertedGames.filter((game) =>
    isSameDay(game.gameDate, selectedDate)
  );

  const openEditModal = (game: Game) => {
    setIsEditing(true);
    setGameToEdit(game);
    setModalShow(true);
  };

  const openStatsModal = async (game: Game) => {
    setIsEditing(true);
    setGameToEdit(game);
    const fetchedStats = await fetchStats(game.gameID || "", eventID!); // Fetch stats from Firebase
    setStats(fetchedStats);
    setWinner(""); // Set the initial winner once i have this info
    setStatsModalShow(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setGameToEdit(undefined);
    setModalShow(false);
    setStatsModalShow(false);
    getEvent();
  };

  const handleSaveStats = async (
    updatedStats: PlayerStats[],
    updatedWinner: string
  ) => {
    if (gameToEdit?.gameID) {
      const gameRef = doc(
        db,
        "rec-leagues",
        eventID!,
        "games",
        gameToEdit.gameID
      );
      const statsRef = collection(gameRef, "stats");

      try {
        // Use a loop instead of batch for updateDoc
        for (const stat of updatedStats) {
          const statDocRef = doc(statsRef, stat.playerID);
          await updateDoc(statDocRef, stat);
        }

        // Update the winner field
        await updateDoc(gameRef, { winner: updatedWinner });

        console.log("Stats updated successfully!");
      } catch (error) {
        console.error("Error updating stats: ", error);
      }
    }
  };

  const deleteGame = async (game: Game) => {
    if (game.gameID) {
      try {
        const gameRef = doc(db, "rec-leagues", eventID!, "games", game.gameID);
        await deleteDoc(gameRef);
        console.log("Game deleted successfully!");
        getEvent();
      } catch (error) {
        console.error("Error deleting game: ", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="mb-3 fw-bold">{format(currentWeek, "MMMM yyyy")}</div>
        <div className="d-flex align-items-center">
          {startOfCurrentWeek > startDate && (
            <button
              className="btn btn-outline-secondary"
              onClick={previousWeek}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          )}
          <div className="d-flex justify-content-between w-100 mx-3">
            {daysOfWeek.map((day) => (
              <div
                key={day.toISOString()}
                className={`text-center date-item ${
                  isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                <div>{format(day, "EEE")}</div>
                <div className="fw-bold">{format(day, "d")}</div>
                {/* Game Indicator */}
                {convertedGames.filter((game) => {
                  const sameDay = isSameDay(game.gameDate, day);
                  return sameDay;
                }).length > 0 && <div className="game-indicator"></div>}
              </div>
            ))}
          </div>

          {endOfCurrentWeek < endDate && (
            <button className="btn btn-outline-secondary" onClick={nextWeek}>
              <i className="bi bi-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <ul className="list-group">
          {gamesOnSelectedDate.length > 0 ? (
            <>
              {gamesOnSelectedDate.map((game, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div>
                      <strong>Away Team:</strong> {game.awayTeam}{" "}
                      {game.winner === game.awayTeam && (
                        <span className="badge bg-success">Winner</span>
                      )}
                    </div>
                    <div>
                      <strong>Home Team:</strong> {game.homeTeam}{" "}
                      {game.winner === game.homeTeam && (
                        <span className="badge bg-success">Winner</span>
                      )}
                    </div>
                    <p className="opacity-50 fw-semibold">
                      {game.gameDate.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div>
                    {isUserView ? (
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openStatsModal(game)}
                      >
                        {" "}
                        <i className="bi bi-bar-chart-line-fill"></i>
                      </button>
                    ) : null}

                    {isEditingLeague ? (
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openStatsModal(game)}
                      >
                        {" "}
                        <i className="bi bi-bar-chart-line-fill"></i>
                      </button>
                    ) : null}

                    {isUserView ? null : (
                      <>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => openEditModal(game)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteGame(game)}
                        >
                          <span>
                            <i className="bi bi-x"></i>
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </>
          ) : (
            <p className="text-center lead fw-semibold mb-3">No games scheduled for this date.</p>
          )}
        </ul>
      </div>
      {isUserView ? null : (
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setModalShow(true)}
          >
            Add Game
          </button>
        </div>
      )}

      <StatsModal
        show={statsModalShow}
        onHide={closeModal}
        game={gameToEdit}
        initialStats={stats}
        initialWinner={winner}
        isUserView={isUserView}
        onSave={handleSaveStats}
      />
      <GameModal
        show={modalShow}
        onHide={closeModal}
        selectedDate={selectedDate}
        teams={teams}
        addGame={addGame}
        editGame={editGame}
        isEditing={isEditing}
        isEditingLeague={isEditingLeague}
        gameToEdit={gameToEdit}
      />
    </div>
  );
};

export default DateBrowser;
