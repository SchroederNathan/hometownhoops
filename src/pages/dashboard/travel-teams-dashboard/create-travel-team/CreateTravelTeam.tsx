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
const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState<string>("");

    const openModal = useCallback(() => {
        console.log(editor.chain().focus());
        setUrl(editor.getAttributes("link").href);
        setIsOpen(true);
    }, [editor]);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setUrl("");
    }, []);

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

    const toggleCode = useCallback(() => {
        editor.chain().focus().toggleCode().run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div>
            <Link to='../travel-teams'>
                <button type="button" className="btn btn-labeled btn-danger">
                    <span className="btn-label"><i className="bi bi-x"></i></span>
                    Cancel
                </button>
            </Link>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-5">Name</label>
                <input type='name' className="form-control" id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label fs-5">Location</label>
                <input type='name' className="form-control" id="location" />
            </div>
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
            <div className="editor">
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
        </div>
    )
}







export default CreateTravelTeam