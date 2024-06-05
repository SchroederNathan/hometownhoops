import { useParams } from "react-router-dom";
import "./LeagueDetails.css";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { checkIfOpen } from "../../../components/helpers/Functions";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
// Row Data Interface
interface Team {
  teamName: string;
  wins: number;
  losses: number;
}

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<Team[]>([
    { teamName: "Tesla", wins: 1, losses: 2 },
    { teamName: "Monstars", wins: 1, losses: 2 },
    { teamName: "Test Data", wins: 3, losses: 2 },
    { teamName: "Anotha", wins: 1, losses: 2 },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Team>[]>([
    { field: "teamName", flex: 2 },
    { field: "wins" , flex: 1},
    { field: "losses", flex: 1 },
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
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

const LeagueDetails = () => {
  const { eventID } = useParams();

  const [event, setEvent] = useState({});

  //db.collection('books').where(firebase.firestore.FieldPath.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5').get()

  useEffect(() => {
    const getEvent = async () => {
      // READ DATA
      try {
        const docRef = doc(db, "rec-leagues", eventID!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvent(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getEvent();
  }, [eventID]);

  return (
    <div className="container-fluid details-main mb-3">
      {checkIfOpen(event.endDate, new Date()) ? (
        <h2 className="card-title mb-1 mt-3">
          <strong>{event.name}</strong>{" "}
          <span className="badge text-bg-primary fs-6 align-middle">
            Closed
          </span>
        </h2>
      ) : (
        <h2 className="card-title mb-1 mt-3">
          <strong>{event.name}</strong>{" "}
          <span className="badge text-bg-primary fs-6 align-middle">Open</span>
        </h2>
      )}
      <span style={{ lineHeight: "40px" }}>
        <i
          className="bi bi-calendar d-inline "
          style={{ paddingRight: "10px" }}
        ></i>
        <p className="d-inline ">
          {event.startDate}
          <i className="bi bi-arrow-right-short"></i>
          {event.endDate}
        </p>
      </span>
      <br />
      <span>
        <i
          className="bi bi-geo-alt-fill d-inline"
          style={{ paddingRight: "10px" }}
        ></i>
        <p className="d-inline">{event.location}</p>
      </span>
      <p
        className="card-text mb-3 mt-1"
        dangerouslySetInnerHTML={{ __html: event.rules }}
      ></p>
      <GridExample />
    </div>
  );
};

export default LeagueDetails;
