import { AgGridReact } from "ag-grid-react";
import PlayerStats from "./PlayerStats";
import { Team } from "../../../dashboard/rec-leagues-dashboard/create-rec-league/teams/TeamsCreateRecLeague";
import { useEffect, useRef, useState } from "react";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
// Row Data Interface

// Create new StatsGrid component

const TeamStats = ({ teams, games }) => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    // Initialize rowData with teams' names and default wins and losses set to 0.
    setRowData(teams.map((team: Team) => ({ ...team, wins: 0, losses: 0 })));

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

  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);

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


export default TeamStats;