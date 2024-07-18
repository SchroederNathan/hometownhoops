import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DateBrowser.css'; // Create and import a CSS file for custom styles
import GameModal from './GameModal';

interface Game {
  date: Date;
  awayTeam: string;
  homeTeam: string;
}

interface DateBrowserProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  games: Game[];
  setGames: (games: Game[]) => void;
}

const DateBrowser: React.FC<DateBrowserProps> = ({ selectedDate, setSelectedDate, games, setGames }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | undefined>(undefined);

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 0 }); // Sunday as the start of the week
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

  const addGame = (awayTeam: string, homeTeam: string) => {
    const newGame = { date: selectedDate, awayTeam, homeTeam };
    setGames([...games, newGame]);
  };

  const editGame = (awayTeam: string, homeTeam: string) => {
    setGames(games.map(game =>
      isSameDay(game.date, selectedDate) && game.awayTeam === gameToEdit?.awayTeam && game.homeTeam === gameToEdit?.homeTeam
        ? { ...game, awayTeam, homeTeam }
        : game
    ));
  };

  const gamesOnSelectedDate = games.filter(game => isSameDay(game.date, selectedDate));

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
              <span className=""><i className="bi bi-pencil"></i></span>

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
        addGame={addGame}
        editGame={editGame}
        isEditing={isEditing}
        gameToEdit={gameToEdit}
      />
    </div>
  );
};

export default DateBrowser;
