import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import extensions from './extensions';
import Toolbar from './components/Toolbar';
import EditorContentDisplay from './components/EditorContentDisplay';
import './styles/editor.scss';


const makeExtensionsDraggable = (extensions) => {
    return extensions.map(extension => {
        // 检查扩展是否已经有 draggable 设置，如果没有，则设置为 true
        if (typeof extension === 'function') {
            return extension.extend({
                draggable: true,
            });
        }
        return extension;
    });
};


const RhizomeEditor = () => {
    const editor = useEditor({
        extensions: makeExtensionsDraggable(extensions),
        content: `
            <p>This is a boring paragraph.</p>
            <div data-type="draggable-item">
                <p>Followed by a fancy draggable item.</p>
                <div data-type="draggable-item">
                <p>Followed by a fancy draggable item.</p>
                <div data-type="draggable-item">
                <p>Followed by a fancy draggable item.</p>
            </div>
            <div data-type="draggable-item">
                <p>Followed by a fancy draggable item.</p>
            </div>
            </div>
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
