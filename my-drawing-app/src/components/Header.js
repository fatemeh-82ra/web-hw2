// src/components/Header.js
import React, { useRef } from 'react';

function Header({ drawingName, onDrawingNameChange, onExport, onImport }) {
    const fileInputRef = useRef(null);

    const handleImportClick = () => {
        fileInputRef.current.click(); // Programmatically click the hidden file input
    };

    return (
        <header className="app-header">
            <input
                type="text"
                value={drawingName}
                onChange={(e) => onDrawingNameChange(e.target.value)}
                placeholder="Painting Title"
                className="drawing-name-input"
            />
            <div>
                <button onClick={onExport} className="header-button">Export</button>
                <button onClick={handleImportClick} className="header-button">Import</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onImport}
                    accept=".json"
                    style={{ display: 'none' }} // Hide the default file input
                />
            </div>
        </header>
    );
}

export default Header;