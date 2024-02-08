import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import extensions from './extensions';
import Toolbar from './components/Toolbar';
import EditorContentDisplay from './components/EditorContentDisplay';
import EmojiPicker from 'emoji-picker-react'; // 导入EmojiPicker组件
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
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // 添加state来控制EmojiPicker的显示状态

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

    const insertEmoji = (emoji) => {
        // alert(`Inserting emoji: ${emoji}`);
        editor.chain().focus().insertContent(emoji).run(); // 使用insertContent方法插入emoji
    };

    if (!editor) {
        return null;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div>
                <Toolbar editor={editor} />
                {showEmojiPicker && ( // 根据showEmojiPicker状态决定是否显示EmojiPicker
                    <EmojiPicker onEmojiClick={(emojiData, event) => {
                        // 处理选择的emoji
                        // 将选定的emoji插入到编辑器中
                        insertEmoji(emojiData.emoji);
                        setShowEmojiPicker(false); // 插入后隐藏EmojiPicker
                    }} />
                )}
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>Toggle Emoji Picker</button> {/* 添加按钮来显示/隐藏EmojiPicker */}
                <EditorContent editor={editor} />
            </div>
            <EditorContentDisplay editorJson={editorJson} />

        </div>
    );
};

export default RhizomeEditor;
