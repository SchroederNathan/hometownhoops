import React, { useEffect, useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, parse } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DateBrowser.css'; // Ensure this file exists for custom styles
import GameModal from './GameModal';
import { Team } from '../teams/TeamsCreateRecLeague';
import { Timestamp } from 'firebase/firestore';
import { se } from 'date-fns/locale';


export interface Game {
  gameDate: Date;
  awayTeam: string;
  homeTeam: string;
}

interface DateBrowserProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  games: Game[];
  setGames: (games: Game[]) => void;
  teams: Team[]; // Added teams prop
}

const DateBrowser: React.FC<DateBrowserProps> = ({ selectedDate, setSelectedDate, games, setGames, teams }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | undefined>(undefined);

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 0 });

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(addDays(startOfCurrentWeek, i));
  }

  const previousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const addGame = (awayTeam: string, homeTeam: string, time: string) => {
    const [hours, minutes] = time.split(':');
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));

    const newGame = { gameDate: newDate, awayTeam, homeTeam };
    setGames([...games, newGame]);
  };

  const editGame = (awayTeam: string, homeTeam: string, time: string) => {
    const [hours, minutes] = time.split(':');
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));

    const updatedGames = games.map(game =>
      isSameDay(game.gameDate, selectedDate) && game.awayTeam === gameToEdit?.awayTeam && game.homeTeam === gameToEdit?.homeTeam
        ? { ...game, awayTeam, homeTeam, gameDate: newDate }
        : game
    );
    setGames(updatedGames);
    setIsEditing(false);
    setGameToEdit(undefined);
  };

  // Convert Firestore Timestamps to JavaScript Dates
  const convertedGames = games.map(game => ({
    ...game,
    gameDate: game.gameDate instanceof Timestamp ? game.gameDate.toDate() : game.gameDate,
  }));

  const gamesOnSelectedDate = convertedGames.filter(game => isSameDay(game.gameDate, selectedDate));

  console.log(selectedDate);
  gamesOnSelectedDate.forEach(game => {
    console.log(game.gameDate);
  });

  const openEditModal = (game: Game) => {
    setIsEditing(true);
    setGameToEdit(game);
    setModalShow(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setGameToEdit(undefined);
    setModalShow(false);
  };



  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="mb-3 fw-bold">{format(currentWeek, 'MMMM yyyy')}</div>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-secondary" onClick={previousWeek}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="d-flex justify-content-between w-100 mx-3">
            {daysOfWeek.map((day) => (
              <div
                key={day.toISOString()}
                className={`text-center date-item ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <div>{format(day, 'EEE')}</div>
                <div className="fw-bold">{format(day, 'd')}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-outline-secondary" onClick={nextWeek}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <ul className="list-group">
          {gamesOnSelectedDate.map((game, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div><strong>Away Team:</strong> {game.awayTeam}</div>
                <div><strong>Home Team:</strong> {game.homeTeam}</div>
              </div>
              <button className="btn btn-sm btn-primary" onClick={() => openEditModal(game)}>
                <i className="bi bi-pencil"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary" onClick={() => setModalShow(true)}>
          Add Game
        </button>
      </div>

      <GameModal
        show={modalShow}
        onHide={closeModal}
        selectedDate={selectedDate}
        teams={teams}
        addGame={addGame}
        editGame={editGame}
        isEditing={isEditing}
        gameToEdit={gameToEdit}
      />
    </div>
  );
};

export default DateBrowser;