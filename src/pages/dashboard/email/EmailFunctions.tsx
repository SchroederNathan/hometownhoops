import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
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

// Remove selected emails from firestore
export const removeEmails = async (
  emails: Email[],
  setRowData: any,
  rowData: any
) => {
  const batch = writeBatch(db); // Use writeBatch to create a batch of writes

  emails.forEach((email) => {
    // Use the email string as the document ID
    const emailRef = doc(db, "email-list", email.email);

    // Delete the document
    batch.delete(emailRef);

    // Remove the email from the row data
    setRowData(rowData.filter((row: any) => row.email !== email.email));
  });

  try {
    await batch.commit(); // Use await to handle the promise
    console.log("Removed emails: ", emails);
  } catch (error) {
    console.error("Error removing emails: ", error);
  }
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
