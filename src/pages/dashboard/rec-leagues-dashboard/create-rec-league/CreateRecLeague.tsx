import './CreateRecLeague.css'
// import { Link } from 'react-router-dom'
import Color from '@tiptap/extension-text'
import ListItem from '@tiptap/extension-list-item'
import { EditorProvider, useCurrentEditor, useEditor, Editor, EditorContent, BubbleMenu } from '@tiptap/react'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from '@tiptap/extension-text-style';

import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import History from "@tiptap/extension-history";
import Heading from "@tiptap/extension-heading";
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, ChangeEventHandler, useEffect, useRef, useState } from 'react'
import * as Icons from "../../../../components/helpers/Icons";
import classNames from 'classnames'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import EditorComponent from '../../../../components/helpers/EditorComponent';
import { FileInput } from '../../../../components/helpers/FileInput';
import { useHooks } from '../../../../components/helpers/Hooks';
import { ScheduleModal } from '../../../../components/helpers/schedule/ScheduleModal';
import { Scheduler } from '@aldabil/react-scheduler';



const CreateRecLeague = () => {

    const { state } = useLocation();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(Date);
    const [endDate, setEndDate] = useState(Date);
    const [rules, setRules] = useState(`<h1>League Information</h1>
    <ul><li>Information here</li></ul>
    `);
    const [selectedImage, setSelectedImage] = useState(useRef<HTMLDivElement>(null));

    const { handleFiles, imageContainerRef } = useHooks();
    const [modalShow, setModalShow] = React.useState(false);



    const navigate = useNavigate();

    function preview(event: any) {
        event.preventDefault();

        navigate("/dashboard/rec-leagues/create/preview",
            {
                state: {
                    name,
                    location,
                    startDate,
                    endDate,
                    rules
                }
            }
        );

    }

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
            OrderedList

        ],
        onUpdate({ editor }) {
            setRules(editor.getHTML())
        },
        content: rules
    }) as Editor;

    function onImageChange(event: any) {
        handleFiles(event)
        // setSelectedImage(imageContainerRef)
    }

    useEffect(() => {
        try {
            setName(state.name)
            setLocation(state.location)
            setStartDate(state.startDate)
            setEndDate(state.endDate)
            setRules(state.rules)
            // setSelectedImage(state.selectedImage)

            editor?.commands.setContent(state.rules);

        } catch (error) {
        }
    }, [editor]);


    if (!editor) {
        return null;
    }

    return (
        <div>
            <ul className="nav nav-tabs mb-3 ">
                <li className="nav-item" style={{ marginRight: '2px' }}>
                    <a className="nav-link tab active activeTab" aria-current="page" href="#">Information</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link tab" onClick={(event) => preview(event)} href="#">Preview</a>
                </li>
            </ul>

            <form onSubmit={(event) => event.preventDefault()}>
                <button type="button" onClick={() => setModalShow(true)} style={{ width: '170px' }} className="btn btn-labeled-1 btn-primary create-button">
                    Edit Schedule
                    <span className="btn-label-1"><i className="bi bi-calendar-event"></i></span>
                </button>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-5">Name</label>
                    <input type='name' className="form-control" id="name" autoComplete='true' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-group mb-3 ">
                    <label htmlFor='imageUpload' className='form-label fs-5 w-100'>Image</label>
                    <input type="file" className="form-control rounded" accept="image/*" onChange={(event) => onImageChange(event)} id="imageUpload" />
                    <div ref={selectedImage} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label fs-5">Location</label>
                    <input type='name' className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className='mb-3 row'>
                    <div className="w-50">
                        <label htmlFor="startDate" className="form-label fs-5">Start Date</label>
                        <input id="startDate" className="form-control" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="w-50">
                        <label htmlFor="endDate" className="form-label fs-5">End Date</label>
                        <input id="endDate" className="form-control" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                    </div>
                </div>

                <p className='form-label fs-5'>Rules</p>
                <EditorComponent editor={editor} />

                <p className='form-label fs-5'>Schedule</p>

                <Scheduler view="month"
                    day={null}
                    month={{
                        weekDays: [0, 1, 2, 3, 4, 5],
                        weekStartOn: 6,
                        startHour: 16,
                        endHour: 24
                    }}
                    week={null}

                />
                <Link to='../travel-teams'>
                    <button type="button" className="btn btn-labeled btn-danger mt-3">
                        <span className="btn-label"><i className="bi bi-x"></i></span>
                        Cancel
                    </button>
                </Link>
                <button type="button" className="btn btn-labeled-1 btn-primary float-end create-button mt-3">
                    Create
                    <span className="btn-label-1"><i className="bi bi-check"></i></span>
                </button>
            </form>

            <ScheduleModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}







export default CreateRecLeague