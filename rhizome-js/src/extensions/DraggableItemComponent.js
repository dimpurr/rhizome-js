import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

const DraggableItemComponent = ({ node, updateAttributes, deleteNode, editor }) => {
    const id = node.attrs['data-uuid'];

    // 创建拖拽手柄
    const dragHandle = (
        <div
            contentEditable={false} // 确保手柄不可编辑
            draggable={true} // 使手柄可拖拽
            data-drag-handle // 标记为拖拽手柄，方便样式化或特定逻辑处理
            style={{
                cursor: 'grab',
                backgroundColor: '#ccc',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
            }}
        >
            {/* 可以放置您的图标或者简单使用文本表示拖拽 */}
            <span>::</span>
        </div>
    );

    return (
        <NodeViewWrapper
            className="draggable-item"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                margin: '10px 0',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
            }}
        >
            <div className='flex'>{dragHandle}
                <div style={{ marginRight: '10px', color: 'gray' }}>ID: {id}</div>
            </div>
            {/* 使用 NodeViewContent 渲染节点内部内容 */}
            <NodeViewContent
                className="content"
                style={{ outline: 'none', flexGrow: 1 }}
            />
        </NodeViewWrapper>
    );
};

export default DraggableItemComponent;
