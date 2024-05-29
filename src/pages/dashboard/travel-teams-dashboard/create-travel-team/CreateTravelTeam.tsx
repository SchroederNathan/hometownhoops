import './CreateTravelTeam.css'
// import { Link } from 'react-router-dom'
import Color from '@tiptap/extension-text'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text'
import { EditorProvider, useCurrentEditor, useEditor, Editor, EditorContent, BubbleMenu } from '@tiptap/react'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import History from "@tiptap/extension-history";
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useState } from 'react'
import * as Icons from "../../Icons";
import classNames from 'classnames'
import { Link } from 'react-router-dom'
const content = ``

const CreateTravelTeam = () => {
    const editor = useEditor({
        extensions: [
            Document,
            History,
            Paragraph,
            Text,
            Bold,
            Underline,
            Italic,
            Strike
        ],
        content
    }) as Editor;

    const toggleBold = useCallback(() => {
        editor.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleUnderline = useCallback(() => {
        editor.chain().focus().toggleUnderline().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
        editor.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleStrike = useCallback(() => {
        editor.chain().focus().toggleStrike().run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item active">Information</li>
                    <li className="breadcrumb-item"><a href="#">Application</a></li>
                    <li className="breadcrumb-item" aria-current="page"><a href="#">Preview<a /></a></li>
                </ol>
            </nav>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-5">Name</label>
                <input type='name' className="form-control" id="name" />
            </div>
            <div className="input-group mb-3 ">
                <label htmlFor='imageUpload' className='form-label fs-5 w-100'>Image</label>
                <input type="file" className="form-control rounded" id="imageUpload" />
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label fs-5">Location</label>
                <input type='name' className="form-control" id="location" />
            </div>asdasd
            <div className='mb-3 row'>
                <div className="w-50">
                    <label htmlFor="date" className="form-label fs-5">Start Date</label>
                    <input id="startDate" className="form-control" type="date" />
                </div>
                <div className="w-50">
                    <label htmlFor="date" className="form-label fs-5">End Date</label>
                    <input id="startDate" className="form-control" type="date" />

                </div>
            </div>

            <p className='form-label fs-5'>Rules</p>
            <div className="editor mb-4">
                <div className="menu">
                    <button
                        className="menu-button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                    >
                        <Icons.RotateLeft />
                    </button>
                    <button
                        className="menu-button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                    >
                        <Icons.RotateRight />
                    </button>
                    <button
                        className={classNames("menu-button", {
                            "is-active": editor.isActive("bold")
                        })}
                        onClick={toggleBold}
                    >
                        <Icons.Bold />
                    </button>
                    <button
                        className={classNames("menu-button", {
                            "is-active": editor.isActive("underline")
                        })}
                        onClick={toggleUnderline}
                    >
                        <Icons.Underline />
                    </button>
                    <button
                        className={classNames("menu-button", {
                            "is-active": editor.isActive("intalic")
                        })}
                        onClick={toggleItalic}
                    >
                        <Icons.Italic />
                    </button>
                    <button
                        className={classNames("menu-button", {
                            "is-active": editor.isActive("strike")
                        })}
                        onClick={toggleStrike}
                    >
                        <Icons.Strikethrough />
                    </button>

                </div>
                <EditorContent editor={editor} />
            </div>

            <Link to='../travel-teams'>
                <button type="button" className="btn btn-labeled btn-danger ">
                    <span className="btn-label"><i className="bi bi-x"></i></span>
                    Cancel
                </button>
            </Link>
            <Link to='#'>
                <button type="button" className="btn btn-labeled-1 btn-primary float-end create-button">
                    Next
                    <span className="btn-label-1"><i className="bi bi-arrow-right-short"></i></span>
                </button>
            </Link>
        </div>
    )
}







export default CreateTravelTeam