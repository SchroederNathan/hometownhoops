import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";


import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Email,
  fetchEmails,
  isFirstColumn,
  onSelectionChanged,
  removeEmails,
} from "./EmailFunctions";
import { useLocation, useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const EmailDashboard = () => {
  // Set grid ref
  const gridRef = useRef<AgGridReact<Email>>(null);

  // Set container style
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  // set row data to emails from firestore
  const [rowData, setRowData] = useState<Email[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<Email[]>([]);

  const { state } = useLocation();

  // fetch emails on component mount
  useEffect(() => {
    if (state) {
      if (state.rowData.length > 0) {
        console.log(state.rowData);
        setRowData(state.rowData);
      } 
    } else {
      fetchEmails(setRowData);
    }
  }, []);

  // Set column definitions
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "email", minWidth: 180, sortable: true },
  ]);

  // Set default column definitions
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
    };
  }, []);

  // Navigate to create email page
  const navigate = useNavigate();
  const handleCreateEmail = () => {
    // Send state of selected emails to create email page
    navigate("create", { state: { selectedEmails, rowData } });
  };

  return (
    <div style={containerStyle}>
      <div className="example-wrapper d-flex flex-column align-items-end">
        <div className="mb-4 float-end">
          <button
            className="btn btn-danger me-1"
            onClick={() => removeEmails(selectedEmails, setRowData, rowData)}
          >
            Remove Selected
          </button>
          <button className="btn btn-primary" onClick={handleCreateEmail}>
            Send Email
          </button>
        </div>
        <div className={"ag-theme-quartz w-100"}>
          <AgGridReact<Email>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            defaultColDef={defaultColDef}
            suppressRowClickSelection={true}
            onSelectionChanged={() =>
              onSelectionChanged(setSelectedEmails, gridRef)
            }
            rowSelection={"multiple"}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailDashboard;
