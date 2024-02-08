import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import extensions from './extensions';
import Toolbar from './components/Toolbar';
import EditorContentDisplay from './components/EditorContentDisplay';
import './styles/editor.scss';


const RhizomeEditor = () => {
    const editor = useEditor({
        extensions: extensions,
        content: `
      <p>This is a boring paragraph.</p>
      <div data-type="draggable-item">
        <p>Followed by a fancy draggable item.</p>
      </div>
    `,
    });

    const [editorJson, setEditorJson] = useState({});

    useEffect(() => {
        if (!editor) return;

        editor.on('update', () => {
            const json = editor.getJSON();
            setEditorJson(json);
        });

        return () => {
            editor.off('update');
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div>
                <Toolbar editor={editor} />
                <EditorContent editor={editor} />
            </div>
            <EditorContentDisplay editorJson={editorJson} />
        </div>
    );
};

export default RhizomeEditor;
