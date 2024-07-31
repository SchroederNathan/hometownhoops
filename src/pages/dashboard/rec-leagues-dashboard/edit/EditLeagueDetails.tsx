import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { db } from "../../../../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  writeBatch,
  collection,
  getDocs,
} from "firebase/firestore";
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
import DateBrowser, {
  Game,
} from "../create-rec-league/date-browser/DateBrowser";
import GameModal from "../create-rec-league/date-browser/GameModal";
import { Team } from "../create-rec-league/teams/TeamsCreateRecLeague";
import StatsModal from "../create-rec-league/date-browser/stats/StatsModal";
import { PlayerStats } from "../Models";
import { Player } from "../create-rec-league/teams/TeamsModal";

const EditLeagueDetails = () => {
  const { eventID } = useParams();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState(Date);
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [rules, setRules] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const [statsModalShow, setStatsModalShow] = useState(false);
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [winner, setWinner] = useState<string>("");

  const updateRef = doc(db, "rec-leagues", `${eventID}`);
  const navigate = useNavigate();
  const selectedImage = useRef<HTMLDivElement>(null);

  const onUpdate = async () => {
    try {
      const batch = writeBatch(db);

      batch.update(updateRef, {
        name: name,
        location: location,
        deadline: deadline,
        startDate: startDate,
        endDate: endDate,
        imgUrl: "none",
        rules: rules,
      });

      const gamesRef = collection(updateRef, "games");

      games.forEach((game) => {
        // Use existing game ID if it exists, otherwise generate a new one
        const gameRef = game.gameID
          ? doc(gamesRef, game.gameID)
          : doc(gamesRef);
        batch.set(gameRef, {
          awayTeam: game.awayTeam,
          homeTeam: game.homeTeam,
          gameDate: game.gameDate,
          winner: game.winner || "", // Use existing winner or default to empty string
        });
      });

      await batch.commit();
      navigate("/dashboard/rec-leagues/");
    } catch (err) {
      alert(err);
    }
  };

  const addGame = (awayTeam: string, homeTeam: string, time: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));

    const newGame = { gameDate: newDate, awayTeam, homeTeam };
    if (editingGame) {
      setGames(games.map((g) => (g === editingGame ? newGame : g)));
      setEditingGame(null);
    } else {
      setGames([...games, newGame]);
    }
  };

  const editGame = (game: Game) => {
    setEditingGame(game);
    setModalShow(true);
  };

  const openStatsModal = (game: Game) => {
    setEditingGame(game);
    setStatsModalShow(true);
  };

  const handleSaveStats = (stats: PlayerStats[], winner: string) => {
    setStats(stats);
    console.log(stats);
    setWinner(winner);
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

  const getEvent = async () => {
    try {
      const docRef = doc(db, "rec-leagues", eventID!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setDeadline(data.deadline);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setLocation(data.location);
        setRules(data.rules);

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
          const playersList: Player[] = playersSnapshot.docs.map(
            (playerDoc) => {
              const playerData = playerDoc.data() as Player;
              return {
                id: playerDoc.id, // Add player ID to the player object
                ...playerData,
              };
            }
          );

          // Add the players array to the team object
          const teamWithPlayers: Team = {
            id: teamDoc.id, // Add team ID to the team object
            ...teamData,
            players: playersList,
          };

          // Add the team object to the teams list
          teamsList.push(teamWithPlayers);
        }

        // Update state with the teams list
        setTeams(teamsList);

        // Set the content in the editor once the data is fetched
        if (editor) {
          editor.commands.setContent(data.rules);
        }
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvent();
    console.log(deadline)
  }, [eventID, editor]);

  if (!editor) {
    return null;
  }

  const preview = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/dashboard/rec-leagues/${eventID}/teams`, {
      state: {
        name,
        eventID: eventID,
        location: location,
        startDate,
        endDate,
        rules,
        teams,
        games,
      },
    });
  };

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
            onClick={(event) => preview(event)}
            href="#"
          >
            Teams
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
        <div className="input-group mb-3 ">
          <label htmlFor="imageUpload" className="form-label fs-5 w-100">
            Image
          </label>
          <input
            type="file"
            className="form-control rounded"
            accept="image/*"
            onChange={(event) => onImageChange(event)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
        <DateBrowser
          isEditingLeague={true}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          games={games}
          setGames={setGames}
          teams={teams}
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
        />

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
          onClick={onUpdate}
        >
          Update
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
        editGame={addGame}
        isEditing={!!editingGame}
        gameToEdit={editingGame ?? undefined}
      />

      <StatsModal
        show={statsModalShow}
        onHide={() => setStatsModalShow(false)}
        game={editingGame}
        onSave={handleSaveStats}
        initialStats={stats}
        initialWinner={winner}
      />
    </div>
  );
};

export default EditLeagueDetails;
