import "./CreateRecLeague.css";
import ListItem from "@tiptap/extension-list-item";
import {
  useEditor,
  Editor,
} from "@tiptap/react";
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
import EditorComponent from "../../../../components/helpers/EditorComponent";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHooks } from "../../../../components/helpers/Hooks";
import { Scheduler } from "@aldabil/react-scheduler";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { EventActions, ProcessedEvent } from "@aldabil/react-scheduler/types";

const CreateRecLeague = () => {
  const { state } = useLocation();

  const [name, setName] = useState(state.name || "");
  const [location, setLocation] = useState(state.location || "");
  const [startDate, setStartDate] = useState(state.startDate || "");
  const [endDate, setEndDate] = useState(state.endDate || "");
  const [rules, setRules] = useState(state.rules || `<h1>League Information</h1><ul><li>Information here</li></ul>`);
  const [teams, setTeams] = useState(state.teams || []);
  const [selectedImage, setSelectedImage] = useState(useRef<HTMLDivElement>(null));

  const { handleFiles, imageContainerRef } = useHooks();
  const [modalShow, setModalShow] = useState(false);

  const [scheduledEvents, setScheduledEvents] = useState([
    {
      event_id: "",
      title: "",
      start: new Date(),
      end: new Date(),
    },
  ]);

  const eventsCollectionRef = collection(db, "rec-leagues");

  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      await addDoc(eventsCollectionRef, {
        name: name,
        location: location,
        startDate: startDate,
        endDate: endDate,
        imgUrl: "none",
        rules: rules,
        teams: teams
      });
      navigate("/dashboard/rec-leagues/");
    } catch (err) {
      alert(err);
    }
  };

  const preview = (event: any, tabName: string) => {
    event.preventDefault();

    if (tabName === 'teams') {
      navigate("/dashboard/rec-leagues/create/teams", { state: { name, location, startDate, endDate, rules, teams } });
    } else if (tabName === 'preview') {
      navigate("/dashboard/rec-leagues/create/preview", {
        state: {
          name,
          location,
          startDate,
          endDate,
          rules,
          teams
        },
      });
    }
  };

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
      setRules(editor.getHTML());
    },
    content: rules,
  }) as Editor;

  useEffect(() => {
    try {
      setName(state.name);
      setLocation(state.location);
      setStartDate(state.startDate);
      setEndDate(state.endDate);
      setRules(state.rules);
      setTeams(state.teams);

      editor?.commands.setContent(state.rules);
    } catch (error) { }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    return new Promise((res, rej) => {
      try {
        scheduledEvents.push({
          event_id: "n/a",
          title: event.title,
          start: event.start,
          end: event.end,
        });
      } catch (err) {
        console.log(err);
      }

      if (action === "edit") {
        /** PUT event to remote DB */
      } else if (action === "create") {
        /**POST event to remote DB */
      }
    });
  };

  return (
    <div>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item " >
          <a className="nav-link tab active me-1" aria-current="page" href="#">
            Information
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link tab" onClick={(event) => preview(event, 'teams')} href="#">
            Teams
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link tab" onClick={(event) => preview(event, 'preview')} href="#">
            Preview
          </a>
        </li>
      </ul>

      <form onSubmit={(event) => event.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            autoComplete="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 ">
          <label htmlFor="imageUpload" className="form-label fs-5 w-100">Image</label>
          <input
            type="file"
            className="form-control rounded"
            accept="image/*"
            onChange={(event) => handleFiles(event)}
            id="imageUpload"
          />
          <div ref={selectedImage} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label fs-5">Location</label>
          <input
            type="name"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-3 row">
          <div className="w-50">
            <label htmlFor="startDate" className="form-label fs-5">Start Date</label>
            <input
              id="startDate"
              className="form-control"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-50">
            <label htmlFor="endDate" className="form-label fs-5">End Date</label>
            <input
              id="endDate"
              className="form-control"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <p className="form-label fs-5">Rules</p>
        <EditorComponent editor={editor} />
        <br />

        <Link to="../travel-teams">
          <button type="button" className="btn btn-labeled btn-danger mt-3">
            <span className="btn-label">
              <i className="bi bi-x"></i>
            </span>
            Cancel
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-labeled-1 btn-primary float-end create-button mt-3"
          onClick={onCreate}
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

export default CreateRecLeague;
