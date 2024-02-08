import React from 'react';
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconList, IconListNumbers, IconBlockquote, IconCode, IconHeading, IconSeparatorHorizontal, IconArrowBack, IconArrowForward } from '@tabler/icons-react';

const Toolbar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div id="toolbar" className="flex gap-2 p-2 bg-gray-100 border-b border-gray-200">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'btn-active' : 'btn'}>
                <IconBold />
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'btn-active' : 'btn'}>
                <IconItalic />
            </button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'btn-active' : 'btn'}>
                <IconUnderline />
            </button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'btn-active' : 'btn'}>
                <IconStrikethrough />
            </button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'btn-active' : 'btn'}>
                <IconList />
            </button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'btn-active' : 'btn'}>
                <IconListNumbers />
            </button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'btn-active' : 'btn'}>
                <IconBlockquote />
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'btn-active' : 'btn'}>
                <IconHeading />
            </button>
            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'btn-active' : 'btn'}>
                <IconCode />
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="btn">
                <IconSeparatorHorizontal />
            </button>
            <button onClick={() => editor.chain().focus().undo().run()} className="btn">
                <IconArrowBack />
            </button>
            <button onClick={() => editor.chain().focus().redo().run()} className="btn">
                <IconArrowForward />
            </button>
        </div>
    );
};

export default Toolbar;
