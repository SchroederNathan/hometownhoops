import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { useState } from 'react';
import { Team } from '../../teams/TeamsCreateRecLeague';
import { AgGridReact } from '@ag-grid-community/react';
import { PlayerStats } from '../../../Models';
import { Form } from 'react-router-dom';
import { Game } from '../DateBrowser';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
// Row Data Interface


// Create new GridExample component
const StatsGrid = ({game}: {game: Game}) => {
    // Row Data: The data to be displayed.
    // const [teamRowData, setTeamRowData] = useState<Team[]>([
    //     { name: "Tesla", wins: 1, losses: 2 },
    //     { name: "Monstars", wins: 1, losses: 2 },
    // ]);

    // // Column Definitions: Defines & controls grid columns.
    // const [teamColDefs, setTeamColDefs] = useState<ColDef<Team>[]>([
    //     { field: "name", flex: 2 },
    //     { field: "wins", flex: 1 },
    //     { field: "losses", flex: 1 },
    // ]);

    const [winner, setWinner] = useState<string>('');

    const [playerRowData, setPlayerRowData] = useState<PlayerStats[]>([
        { name: "Nathan S.", points: 14, rebounds: 8, assists: 3 },
        { name: "Josh O.", points: 14, rebounds: 8, assists: 3 },
        { name: "Owen O.", points: 14, rebounds: 8, assists: 3 },
        { name: "Austin S.", points: 5, rebounds: 8, assists: 3 },
        { name: "Tigh J.", points: 8, rebounds: 8, assists: 3 },
        { name: "Eric J.", points: 1, rebounds: 8, assists: 3 },
        { name: "Nathan S.", points: 20, rebounds: 8, assists: 3 },

    ]);

    // Column Definitions: Defines & controls grid columns.
    const [playerColDefs, setPlayerColDefs] = useState<ColDef<PlayerStats>[]>([
        { field: "name", flex: 2 },
        { field: "points", flex: 1, editable: true },
        { field: "rebounds", flex: 1, editable: true },
        { field: "assists", flex: 1, editable: true },

    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };
    console.log(game);

    // Container: Defines the grid's theme & dimensions.
    return (
        <div
            className={"ag-theme-quartz"}
            style={{ width: "100%" }}
        >
            <label className="form-label mb-3 fw-bold">Winner</label>
            <select className="form-select" id="floatingSelect" value={winner}
                onChange={(e) => setWinner(e.target.value)}>
                <option selected>Select Winner</option>
                <option key='home' value={game.homeTeam}>{game.homeTeam}</option>
                <option key='away' value={game.awayTeam}>{game.awayTeam}</option>
            </select>

            <br />
            <label className="form-label mb-3 mt-3 fw-bold">Players</label>

            <AgGridReact
                rowData={playerRowData}
                columnDefs={playerColDefs}
                rowSelection={"single"}
                domLayout={"autoHeight"}

                defaultColDef={defaultColDef}
            />
        </div>
    );
};

const EditStats = ({game}: {game: Game}) => {
    return (
        <div>
            <StatsGrid game={game} />
        </div>
    )
}

export default EditStats