import { Timestamp } from "firebase/firestore";
import { Game } from "./create-rec-league/date-browser/DateBrowser";

  // Convert Firestore Timestamps to JavaScript Dates
  export const convertedGames = (games: Game[]) => {
    return games.map((game) => ({
      ...game,
      gameDate:
        game.gameDate instanceof Timestamp
          ? game.gameDate.toDate()
          : game.gameDate,
    }));
  };