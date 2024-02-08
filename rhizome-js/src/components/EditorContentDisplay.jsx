// /src/components/Editor/EditorContentDisplay.jsx
import React from 'react';

const EditorContentDisplay = ({ editorJson }) => {
    return (
        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
            <h2>Editor JSON</h2>
            <pre>{JSON.stringify(editorJson, null, 2)}</pre>
        </div>
    );
};

export default EditorContentDisplay;
