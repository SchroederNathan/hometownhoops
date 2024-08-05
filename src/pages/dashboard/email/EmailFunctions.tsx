import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import {
  CheckboxSelectionCallbackParams,
  HeaderCheckboxSelectionCallbackParams,
} from "@ag-grid-community/core";

// Email interface
export interface Email {
  email: string;
}

// Fetch emails from firestore
export const fetchEmails = async (setRowData: any) => {
  const emails = await getDocs(collection(db, "email-list"));
  const filteredData = emails.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
  }));

  setRowData(filteredData);
};

// Remove selected emails
export const removeEmails = (emails: Email[]) => {
  console.log("removed emails: ", emails);
};

// Handle selection change
export const onSelectionChanged = (setSelectedEmails: any, gridRef: any) => {
  if (gridRef.current) {
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSelectedEmails(selectedRows);
  }
};

// Check if column is first column
export function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}
