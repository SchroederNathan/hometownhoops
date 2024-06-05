import { EditorContent, Editor } from '@tiptap/react'
import classNames from 'classnames'
import { useCallback, useEffect } from 'react'
import * as Icons from "./Icons";

type EditorProps = {
    editor: Editor;
}

const EditorComponent = ({ editor }: {editor: Editor}) => {

    
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

    const toggleParagraph = useCallback(() => {
        editor.chain().focus().setParagraph().run();
    }, [editor]);

    const toggleBulletList = useCallback(() => {
        editor.chain().focus().toggleBulletList().run();
    }, [editor]);

    const toggleOrderedList = useCallback(() => {
        editor.chain().focus().toggleOrderedList().run();
    }, [editor]);

    const toggleH1 = useCallback(() => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
    }, [editor]);

    const toggleH2 = useCallback(() => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
    }, [editor]);
    
    const toggleH3 = useCallback(() => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
    }, [editor]);

  return (
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
                                "is-active": editor.isActive("parapgraph")
                            })}
                            onClick={toggleParagraph}
                        >
                            <Icons.Paragraph />
                        </button>
                        <button
                            className={classNames("menu-button", {
                                "is-active": editor.isActive("H1")
                            })}
                            onClick={toggleH1}
                        >
                            <Icons.H1 />
                        </button>
                        <button
                            className={classNames("menu-button", {
                                "is-active": editor.isActive("H2")
                            })}
                            onClick={toggleH2}
                        >
                            <Icons.H2 />
                        </button>
                        <button
                            className={classNames("menu-button", {
                                "is-active": editor.isActive("H3")
                            })}
                            onClick={toggleH3}
                        >
                            <Icons.H3 />
                        </button>
                        <button
                            className={classNames("menu-button", {
                                "is-active": editor.isActive("ul")
                            })}
                            onClick={toggleBulletList}
                        >
                            <Icons.BulletList />
                        </button>
                        <button
                            className={classNames("menu-button", {
                                "is-active": editor.isActive("ol")
                            })}
                            onClick={toggleOrderedList}
                        >
                            <Icons.OrderedList />
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
  )
}

export default EditorComponent