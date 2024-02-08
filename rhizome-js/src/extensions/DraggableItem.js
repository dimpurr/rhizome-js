// src/extensions/DraggableItem.js
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import DraggableItemComponent from './DraggableItemComponent';
import { v4 as uuidv4 } from 'uuid'; // 引入uuid生成器

function deepCopyNode(node, schema, actionType = 'sync', originalUuid) {
    // 不再基于操作类型变化 parentUuid，始终设置为被复制节点的UUID
    const parentUuid = originalUuid; // 始终使用传入的 originalUuid

    if (node.isText) {
        // 对于文本节点，直接复制它们，并保留它们的 marks
        return schema.text(node.text, node.marks);
    } else {
        // 更新属性，包括 data-sync-type 和 data-parent-uuid
        const attrsCopy = {
            ...node.attrs,
            'data-uuid': uuidv4(), // 为新节点生成UUID
            'data-sync-type': actionType, // 标记为 'sync' 或 'clone'
            'data-parent-uuid': parentUuid, // 设置为原始节点的UUID
        };

        // 递归克隆子节点
        let contentCopy = [];
        node.content.forEach(child => {
            contentCopy.push(deepCopyNode(child, schema, actionType, originalUuid));
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
            'data-sync-type': { // 块类型：original、synced、cloned
                default: 'original', // 默认为 original
            },
            'data-parent-uuid': { // 对于 synced 和 cloned 块，记录其原始块的 UUID
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
            createReferenceBlock: (id) => ({ chain, state }) => {
                return chain().focus().command(({ tr, state }) => {
                    const { node, pos } = findNodeById(id, state.doc); // 查找原始节点及其位置
                    if (!node) return false;

                    const endPos = pos + node.nodeSize; // 计算当前节点结束的位置
                    const nodeCopy = deepCopyNode(node, state.schema, 'synced', node.attrs['data-uuid']); // 深拷贝节点，并标记为 synced
                    tr.insert(endPos, nodeCopy); // 在结束位置之后插入节点
                    return true;
                }).run();
            },
            createCloneBlock: (id) => ({ chain, state }) => {
                return chain().focus().command(({ tr, state }) => {
                    const { node, pos } = findNodeById(id, state.doc); // 查找原始节点及其位置
                    if (!node) return false;

                    const endPos = pos + node.nodeSize; // 计算当前节点结束的位置
                    const nodeCopy = deepCopyNode(node, state.schema, 'cloned', node.attrs['data-uuid']); // 深拷贝节点，并标记为 cloned，设置原始UUID
                    tr.insert(endPos, nodeCopy); // 在结束位置之后插入节点
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
