import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Scheduler } from "@aldabil/react-scheduler";
import ListItem from "@tiptap/extension-list-item";
import { useEditor, Editor } from "@tiptap/react";
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

const EditLeagueDetails = () => {
  const { eventID } = useParams();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [rules, setRules] = useState(``);

  //   const eventsCollectionRef = doc(db, "rec-leagues", eventID)
  const updateRef = doc(db, "rec-leagues", `${eventID}`);

  const navigate = useNavigate();

  const onUpdate = async () => {
    try {
      await updateDoc(updateRef, {
        name: name,
        location: location,
        startDate: startDate,
        endDate: endDate,
        imgUrl: "none",
        rules: rules,
      });
      navigate("/dashboard/rec-leagues/")

    } catch (err) {
      alert(err);
    }
  };

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
          setName(docSnap.data().name);
          setStartDate(docSnap.data().startDate);
          setEndDate(docSnap.data().endDate);
          setLocation(docSnap.data().location);
          setRules(docSnap.data().rules);
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

  if (!editor) {
    return null;
  }

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5">
            Name
          </label>
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
          <label htmlFor="imageUpload" className="form-label fs-5 w-100">
            Image
          </label>
          <input
            type="file"
            className="form-control rounded"
            accept="image/*"
            onChange={(event) => onImageChange(event)}
            id="imageUpload"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label fs-5">
            Location
          </label>
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
            <label htmlFor="startDate" className="form-label fs-5">
              Start Date
            </label>
            <input
              id="startDate"
              className="form-control"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-50">
            <label htmlFor="endDate" className="form-label fs-5">
              End Date
            </label>
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

        <p className="form-label fs-5">Schedule</p>

        <Scheduler
          view="month"
          day={null}
          month={{
            weekDays: [0, 1, 2, 3, 4, 5],
            weekStartOn: 6,
            startHour: 16,
            endHour: 24,
          }}
          week={null}
        />
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
          onClick={onUpdate}
        >
          Update
          <span className="btn-label-1">
            <i className="bi bi-check"></i>
          </span>
        </button>
      </form>
    </div>
  );
};

export default EditLeagueDetails;
