import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { useState, useEffect } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { PlayerStats } from "../../../Models";
import { Game } from "../DateBrowser";
import { Player } from "../../teams/TeamsModal";

import "./EditStats.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface StatsGridProps {
  game?: Game;
  stats: PlayerStats[];
  onStatsChange: (stats: PlayerStats[]) => void;
  winner: string;
  onWinnerChange: (winner: string) => void;
  isUserView?: boolean;
}

// Create new GridExample component
const StatsGrid = ({
  game,
  stats,
  onStatsChange,
  winner,
  onWinnerChange,
  isUserView = false,
}: StatsGridProps) => {
  const [homeTeamStats, setHomeTeamStats] = useState<PlayerStats[]>([]);
  const [awayTeamStats, setAwayTeamStats] = useState<PlayerStats[]>([]);
  const [currentWinner, setCurrentWinner] = useState<string>(
    game?.winner || ""
  );

  useEffect(() => {
    if (game) {
      const homeStats = stats.filter((stat) => stat.teamName === game.homeTeam);
      const awayStats = stats.filter((stat) => stat.teamName === game.awayTeam);
      setHomeTeamStats(homeStats);
      setAwayTeamStats(awayStats);
      if (game.winner) {
        setCurrentWinner(game.winner);
      } else {
        setCurrentWinner("TBA");
      }
    }
  }, [game, stats]);

  const handleStatsChange = (
    updatedStats: PlayerStats[],
    team: "home" | "away"
  ) => {
    if (team === "home") {
      setHomeTeamStats(updatedStats);
    } else {
      setAwayTeamStats(updatedStats);
    }
    onStatsChange([...homeTeamStats, ...awayTeamStats]);
  };

  const handleWinnerChange = (value: string) => {
    setCurrentWinner(value);
    onWinnerChange(value);
  };

  // Column Definitions: Defines & controls grid columns.
  const [playerColDefsEditable, setPlayerColDefsEditable] = useState<
    ColDef<Player>[]
  >([
    { field: "playerName", flex: 2 },
    { field: "points", flex: 1, editable: true },
    { field: "rebounds", flex: 1, editable: true },
    { field: "assists", flex: 1, editable: true },
  ]);

  const [playerColDefs, setPlayerColDefs] = useState<ColDef<Player>[]>([
    { field: "playerName", flex: 2 },
    { field: "points", flex: 1 },
    { field: "rebounds", flex: 1 },
    { field: "assists", flex: 1 },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div className={"ag-theme-quartz"} style={{ width: "100%" }}>
      {isUserView ? (
        <>
          <label className="form-label mb-3 fw-bold">Winner</label>
          <input
            type="text"
            className="form-control mb-3"
            readOnly={true}
            id="floatingSelect"
            value={currentWinner}
            contentEditable={false}
          />
        </>
      ) : (
        <>
          <label className="form-label mb-3 fw-bold">Winner</label>

          <select
            className="form-select"
            id="floatingSelect"
            value={currentWinner}
            onChange={(e) => handleWinnerChange(e.target.value)}
          >
            <option value="" disabled>
              Select Winner
            </option>
            <option key="home" value={game?.homeTeam}>
              {game?.homeTeam}
            </option>
            <option key="away" value={game?.awayTeam}>
              {game?.awayTeam}
            </option>
          </select>
          <br />
        </>
      )}

      <label className="form-label mb-3 fw-bold">{game?.homeTeam} Stats</label>

      {isUserView ? (
        <>
          <AgGridReact
            rowData={homeTeamStats}
            columnDefs={playerColDefs}
            domLayout={"autoHeight"}
            defaultColDef={defaultColDef}
          />

          <br />
          <label className="form-label mb-3 fw-bold">
            {game?.awayTeam} Stats
          </label>

          <AgGridReact
            rowData={awayTeamStats}
            columnDefs={playerColDefs}
            domLayout={"autoHeight"}
            defaultColDef={defaultColDef}
          />
        </>
      ) : (
        <>
          <AgGridReact
            rowData={homeTeamStats}
            columnDefs={playerColDefsEditable}
            rowSelection={"single"}
            domLayout={"autoHeight"}
            defaultColDef={defaultColDef}
          />

          <br />
          <label className="form-label mb-3 fw-bold">
            {game?.awayTeam} Stats
          </label>

          <AgGridReact
            rowData={awayTeamStats}
            columnDefs={playerColDefsEditable}
            rowSelection={"single"}
            domLayout={"autoHeight"}
            defaultColDef={defaultColDef}
          />
        </>
      )}
    </div>
  );
};

export default StatsGrid;
