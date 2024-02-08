// src/extensions/DraggableItem.js
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import DraggableItemComponent from './DraggableItemComponent';
import { v4 as uuidv4 } from 'uuid'; // 引入uuid生成器

function deepCopyNode(node, schema) {
    if (node.isText) {
        // 对于文本节点，直接复制它们，并保留它们的 marks
        return node.type.schema.text(node.text, node.marks);
    } else {
        // 复制非文本节点的属性，并为它们生成新的 UUID
        const attrsCopy = {
            ...node.attrs,
            'data-uuid': uuidv4(),
        };

        // 使用 Fragment.forEach 迭代子节点，并递归克隆
        let contentCopy = [];
        node.content.forEach(child => {
            contentCopy.push(deepCopyNode(child, schema));
        });

        // 创建并返回新节点
        return node.type.create(attrsCopy, contentCopy, node.marks);
    }
}


function findNodeById(id, doc) {
    let targetNode = null;
    doc.descendants((node, pos) => {
        if (node.attrs['data-uuid'] === id) {
            targetNode = { node, pos };
            return false; // 找到目标节点后停止搜索
        }
    });
    return targetNode;
}



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
            'data-type': { // 块类型：original、synced、cloned
                default: 'original', // 默认为 original
            },
            'data-type': { // 块类型：original、synced、cloned
                default: 'original', // 默认为 original
            },
            'parent-uuid': { // 对于 synced 和 cloned 块，记录其原始块的 UUID
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
            createReferenceBlock: (id) => ({ chain, tr, dispatch }) => {
                return chain().focus().command(({ tr, state }) => {
                    const originalNode = findNodeById(id, state.doc); // 查找原始节点
                    if (!originalNode) return false;

                    const nodeCopy = deepCopyNode(originalNode.node, 'synced', id, state.schema); // 深拷贝节点，并标记为 synced
                    tr.insert(state.selection.anchor, nodeCopy);
                    // 注意这里不需要显示调用 dispatch，因为 chain() 已经处理了事务的调度
                    return true;
                }).run();
            },

            createCloneBlock: (id) => ({ chain, tr, dispatch }) => {
                return chain().focus().command(({ tr, state }) => {
                    const originalNode = findNodeById(id, state.doc); // 查找原始节点
                    if (!originalNode) return false;

                    const nodeCopy = deepCopyNode(originalNode.node, 'cloned', id, state.schema); // 深拷贝节点，并标记为 cloned
                    tr.insert(state.selection.anchor, nodeCopy);
                    // 同上，无需直接调用 dispatch
                    return true;
                }).run();
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
