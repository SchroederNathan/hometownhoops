import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { Player } from "../../../dashboard/rec-leagues-dashboard/create-rec-league/teams/TeamsModal";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const PlayerStats = ({ players }: { players: Player[] }) => {
  const [rowData, setRowData] = useState<Player[]>(); // Initialize with players

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
        suppressCellFocus={true}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default PlayerStats;
