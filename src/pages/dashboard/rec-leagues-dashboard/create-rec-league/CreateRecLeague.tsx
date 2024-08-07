import "./CreateRecLeague.css";
import ListItem from "@tiptap/extension-list-item";
import { useEditor, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import History from "@tiptap/extension-history";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import EditorComponent from "../../../../components/helpers/EditorComponent";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import DateBrowser, { Game } from "./date-browser/DateBrowser";
import GameModal from "./date-browser/GameModal";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../LeagueHelpers";

const CreateRecLeague = () => {
  const location = useLocation();
  const state = location.state || {};

  const [name, setName] = useState(state.name || "");
  const [locationName, setLocationName] = useState(state.location || "");
  const [deadline, setDeadline] = useState(state.deadline || "");
  const [startDate, setStartDate] = useState(state.startDate || "");
  const [endDate, setEndDate] = useState(state.endDate || "");
  const [rules, setRules] = useState(
    state.rules ||
      `<h1>League Information</h1><ul><li>Information here</li></ul>`
  );
  const [teams, setTeams] = useState(state.teams || []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState<Game[]>(state.games || []);
  const [modalShow, setModalShow] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [image, setImage] = useState<File | null>(null);


  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      const batch = writeBatch(db);
      const playerIds: { [teamName: string]: string[] } = {};

      const imageURL = await uploadImage(image!);

      const recLeagueRef = doc(collection(db, "rec-leagues"));
      
      batch.set(recLeagueRef, {
        name: name,
        imgUrl: imageURL,
        location: locationName,
        deadline: deadline,
        startDate: startDate,
        endDate: endDate,
        rules: rules,
      });

      // Set teams in the rec-leagues collection
      teams.forEach((team) => {
        const teamRef = doc(collection(recLeagueRef, "teams"), team.id);
        batch.set(teamRef, {
          name: team.name,
        });

        playerIds[team.name] = []; // Initialize array for storing player IDs

        team.players.forEach((player: any) => {
          const playerId = uuidv4(); // Generate a unique ID for each player
          const playerRef = doc(collection(teamRef, "players"), playerId);
          batch.set(playerRef, {
            name: player.name,
            id: playerId, // Store the player ID in the document
          });

          playerIds[team.name].push(playerId); // Store the player ID in the array
        });
      });

      games.forEach((game, index) => {
        const newGameID = uuidv4();
        const gameRef = doc(collection(recLeagueRef, "games"), newGameID);
        batch.set(gameRef, {
          awayTeam: game.awayTeam,
          homeTeam: game.homeTeam,
          gameDate: game.gameDate,
          winner: "",
        });

        const statsRef = collection(gameRef, "stats");

        // Set stats for players in the home team
        if (playerIds[game.homeTeam]) {
          playerIds[game.homeTeam].forEach((playerId) => {
            const statsDocRef = doc(statsRef, playerId);
            batch.set(statsDocRef, {
              teamName: game.homeTeam, // Store the team name in the stats document
              playerID: playerId,
              points: 0,
              assists: 0,
              rebounds: 0,
            });
          });
        }

        // Set stats for players in the away team
        if (playerIds[game.awayTeam]) {
          playerIds[game.awayTeam].forEach((playerId) => {
            const statsDocRef = doc(statsRef, playerId);
            batch.set(statsDocRef, {
              teamName: game.awayTeam, // Store the team name in the stats document
              playerID: playerId,
              points: 0,
              assists: 0,
              rebounds: 0,
            });
          });
        }
      });

      await batch.commit();
      navigate("/dashboard/rec-leagues/");
    } catch (err) {
      alert(err);
    }
  };

  const preview = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    tabName: string
  ) => {
    event.preventDefault();

    if (tabName === "teams") {
      navigate("/dashboard/rec-leagues/create/teams", {
        state: {
          name,
          location: locationName,
          deadline,
          startDate,
          endDate,
          rules,
          teams,
          games,
        },
      });
    } else if (tabName === "preview") {
      navigate("/dashboard/rec-leagues/create/preview", {
        state: {
          name,
          location: locationName,
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

  const addGame = (awayTeam: string, homeTeam: string, time: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));

    const newGame = { date: newDate, awayTeam, homeTeam };
    if (editingGame) {
      setGames(games.map((g) => (g === editingGame ? newGame : g)));
      setEditingGame(null);
    } else {
      setGames([...games, newGame]);
    }
  };

  const editGame = (awayTeam: string, homeTeam: string, time: string) => {
    if (editingGame) {
      const [hours, minutes] = time.split(":");
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours));
      newDate.setMinutes(parseInt(minutes));

      const updatedGame = { ...editingGame, date: newDate, awayTeam, homeTeam };
      setGames(
        games.map((game) => (game === editingGame ? updatedGame : game))
      );
      setEditingGame(null);
    }
  };

  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      Strike,
      Heading,
      ListItem,
      BulletList,
      OrderedList,
    ],
    onUpdate({ editor }) {
      setRules(editor.getHTML());
    },
    content: rules,
  }) as Editor;

  useEffect(() => {
    if (editor && state.rules) {
      editor.commands.setContent(state.rules);
    }
    teams.forEach((team) => {
      console.log(team.players);
    });
  }, [editor, state.rules]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <a className="nav-link tab active me-1" aria-current="page" href="#">
            Information
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link tab"
            onClick={(event) => preview(event, "teams")}
            href="#"
          >
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

      <form onSubmit={(event) => event.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            autoComplete="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="imageUpload" className="form-label fs-5 w-100">
            Image
          </label>
          <input
                type="file"
                className="form-control rounded"
                accept="image/*"
                onChange={(event) => setImage(event.target.files![0])}
                id="imageUpload"
              />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label fs-5">
            Location
          </label>
          <input
            type="name"
            className="form-control"
            id="location"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>
        <div className="w-100 mb-3">
          <label htmlFor="deadline" className="form-label fs-5">
            Registration Deadline
          </label>
          <input
            id="mb"
            className="form-control"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="mb-3 row">
          <div className="w-50">
            <label htmlFor="startDate" className="form-label fs-5">
              Start Date
            </label>
            <input
              id="startDate"
              className="form-control"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-50">
            <label htmlFor="endDate" className="form-label fs-5">
              End Date
            </label>
            <input
              id="endDate"
              className="form-control"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <p className="form-label fs-5">Rules</p>
        <EditorComponent editor={editor} />
        <br />
        {startDate && endDate ? (
          <DateBrowser
            isEditingLeague={false}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            games={games}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
            setGames={setGames}
            teams={teams}
          />
        ) : null}

        <Link to="../travel-teams">
          <button type="button" className="btn btn-labeled btn-danger mt-3">
            <span className="btn-label">
              <i className="bi bi-x"></i>
            </span>
            Cancel
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-labeled-1 btn-primary float-end create-button mt-3"
          onClick={onCreate}
        >
          Create
          <span className="btn-label-1">
            <i className="bi bi-check"></i>
          </span>
        </button>
      </form>

      <GameModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setEditingGame(null);
        }}
        selectedDate={selectedDate}
        teams={teams}
        addGame={addGame}
        editGame={editGame}
        isEditing={!!editingGame}
        gameToEdit={editingGame ?? undefined}
      />
    </div>
  );
};

export default CreateRecLeague;
