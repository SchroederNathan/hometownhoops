import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { useState } from 'react';
import { Team } from '../../teams/TeamsCreateRecLeague';
import { AgGridReact } from '@ag-grid-community/react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
// Row Data Interface


// Create new GridExample component
const StatsGrid = () => {
  // Row Data: The data to be displayed.
  const [teamRowData, setTeamRowData] = useState<Team[]>([
    { name: "Tesla", wins: 1, losses: 2 },
    { name: "Monstars", wins: 1, losses: 2 },
    { name: "Test Data", wins: 3, losses: 2 },
    { name: "Anotha", wins: 1, losses: 2 },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [teamColDefs, setTeamColDefs] = useState<ColDef<Team>[]>([
    { field: "name", flex: 2 },
    { field: "wins" , flex: 1},
    { field: "losses", flex: 1},
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "200px" }}
    >
      <AgGridReact
        rowData={teamRowData}
        columnDefs={teamColDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

const EditStats = () => {
  return (
    <div>
        
    </div>
  )
}

export default EditStats