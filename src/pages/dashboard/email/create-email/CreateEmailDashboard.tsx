import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Email } from "../EmailFunctions";
import { set } from "date-fns";
import EditorComponent from "../../../../components/helpers/EditorComponent";
import { Editor, useEditor } from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import History from "@tiptap/extension-history";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { sendEmail } from "./CreateEmailFunctions";

const CreateEmailDashboard = () => {
  const [selectedEmails, setSelectedEmails] = useState<Email[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("Something");

  const [rowData, setRowData] = useState<Email[]>();

  // Get selected emails from state
  const { state } = useLocation();

  // inialize navigator
  const  navigator  = useNavigate();
  
  const cancel = () => {
    // Go back to email dashboard and send selected emails and row data
    navigator("/dashboard/email", { state: { selectedEmails, rowData } });
    
  };

  // Set selected emails from state
  useEffect(() => {
    if (state) {
      setSelectedEmails(state.selectedEmails);
      setRowData(state.rowData);
    }
  });

  // Set editor
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      Strike,
      Heading,
      ListItem,
      BulletList,
      OrderedList,
    ],
    onUpdate({ editor }) {
      setMessage(editor.getHTML());
    },
    content: message,
  }) as Editor;

  if (!editor) {
    return null;
  }

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fs-5">
            Title
          </label>
          <input
            type="title"
            className="form-control"
            id="title"
            autoComplete="true"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="imageUpload" className="form-label fs-5 w-100">
            Image
          </label>
          <input
            type="file"
            className="form-control rounded"
            accept="image/*"
            onChange={(event) => setImage(event.target.files![0])}
            id="imageUpload"
          />
        </div>

        <p className="form-label fs-5">Rules</p>
        <EditorComponent editor={editor} />

        <p className="float-end text-black-50">
          # of recipents: {selectedEmails.length}
        </p>
        <br />
          <button type="button" className="btn btn-labeled btn-danger mt-3" onClick={cancel}>
            <span className="btn-label">
              <i className="bi bi-x"></i>
            </span>
            Cancel
          </button>

        <button
          type="button"
          className="btn btn-labeled-1 btn-primary create-button mt-3 float-end"
          onClick={() => sendEmail(title, message, image!)}
        >
          Create
          <span className="btn-label-1">
            <i className="bi bi-check"></i>
          </span>
        </button>
      </form>
    </div>
  );
};

export default CreateEmailDashboard;
