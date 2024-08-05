import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
// import "./styles.css";
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
  ModuleRegistry,
  createGrid,
} from "@ag-grid-community/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

interface Email {
  email: string;
}

const EmailDashboard = () => {
  const gridRef = useRef<AgGridReact<Email>>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  // set row data to emails from firestore
  const [rowData, setRowData] = useState<Email[]>([]);

  const fetchEmails = async () => {
    const emails = await getDocs(collection(db, "email-list"));
    const filteredData = emails.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setRowData(filteredData);
  };

  // fetch emails on component mount
  useEffect(() => {
    fetchEmails();
  }, []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "email", minWidth: 180, sortable: true },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper d-flex flex-column align-items-end">
        <button className="btn btn-primary float-end mb-4">Send Email</button>
        <div className={"ag-theme-quartz w-100"}>
          <AgGridReact<Email>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            defaultColDef={defaultColDef}
            suppressRowClickSelection={true}
            rowSelection={"multiple"}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailDashboard;
