// src/components/DraggableItemComponent.js
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

const DraggableItemComponent = ({ node, updateAttributes, deleteNode, editor }) => {
    return (
        <NodeViewWrapper
            className="draggable-item"
            style={{
                padding: '10px',
                margin: '10px 0',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                cursor: 'move',
            }}
        >
            {/* 使用 NodeViewContent 渲染节点内部内容 */}
            <NodeViewContent
                className="content"
                style={{ outline: 'none' }}
            />
        </NodeViewWrapper>
    );
};

export default DraggableItemComponent;
