import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { useState, useEffect } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { PlayerStats } from "../../../Models";
import { Game } from "../DateBrowser";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface StatsGridProps {
  game?: Game;
  stats: PlayerStats[];
  onStatsChange: (stats: PlayerStats[]) => void;
  winner: string;
  onWinnerChange: (winner: string) => void;
}

// Create new GridExample component
const StatsGrid = ({
  game,
  stats,
  onStatsChange,
  winner,
  onWinnerChange,
}: StatsGridProps) => {
  const [homeTeamStats, setHomeTeamStats] = useState<PlayerStats[]>([]);
  const [awayTeamStats, setAwayTeamStats] = useState<PlayerStats[]>([]);

  useEffect(() => {
    if (game) {
      const homeStats = stats.filter((stat) => stat.teamName === game.homeTeam);
      const awayStats = stats.filter((stat) => stat.teamName === game.awayTeam);
      setHomeTeamStats(homeStats);
      setAwayTeamStats(awayStats);
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

  // Column Definitions: Defines & controls grid columns.
  const [playerColDefs, setPlayerColDefs] = useState<ColDef<PlayerStats>[]>([
    { field: "playerName", flex: 2 },
    { field: "points", flex: 1, editable: true },
    { field: "rebounds", flex: 1, editable: true },
    { field: "assists", flex: 1, editable: true },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div className={"ag-theme-quartz"} style={{ width: "100%" }}>
      <label className="form-label mb-3 fw-bold">Winner</label>
      <select
        className="form-select"
        id="floatingSelect"
        value={winner}
        onChange={(e) => onWinnerChange(e.target.value)}
      >
        <option selected>Select Winner</option>
        <option key="home" value={game?.homeTeam}>
          {game?.homeTeam}
        </option>
        <option key="away" value={game?.awayTeam}>
          {game?.awayTeam}
        </option>
      </select>

      <br />
      <label className="form-label mb-3 fw-bold">{game?.homeTeam} Stats</label>

      <AgGridReact
        rowData={homeTeamStats}
        columnDefs={playerColDefs}
        rowSelection={"single"}
        domLayout={"autoHeight"}
        defaultColDef={defaultColDef}
        // onCellValueChanged={(params) =>
        //   handleStatsChange(
        //     params.api.getRowNode(params.node.id)?.data as PlayerStats[],
        //     "home"
        //   )
        // }
      />

      <br />
      <label className="form-label mb-3 fw-bold">{game?.awayTeam} Stats</label>

      <AgGridReact
        rowData={awayTeamStats}
        columnDefs={playerColDefs}
        rowSelection={"single"}
        domLayout={"autoHeight"}
        defaultColDef={defaultColDef}
        // onCellValueChanged={(params) =>
        //   handleStatsChange(
        //     params.api.getRowNode(params.node.id)?.data as PlayerStats[],
        //     "away"
        //   )
        // }
      />
    </div>
  );
};

export default StatsGrid;
