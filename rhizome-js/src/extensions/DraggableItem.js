// src/extensions/DraggableItem.js
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import DraggableItemComponent from './DraggableItemComponent';
import { v4 as uuidv4 } from 'uuid'; // 引入uuid生成器


export const DraggableItem = Node.create({
    name: 'draggableItem',
    group: 'block',
    content: 'block+',
    draggable: true,

    addAttributes() {
        return {
            'data-uuid': {
                default: null,
            },
        };
    },

    addCommands() {
        return {
            createDraggableItem: () => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: { 'data-uuid': uuidv4() }, // 为新节点生成UUID
                });
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="draggable-item"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        // Ensure mergeAttributes is used here
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-item' }), 0];
    },

    addNodeView() {
        return ReactNodeViewRenderer(DraggableItemComponent);
    },
});
