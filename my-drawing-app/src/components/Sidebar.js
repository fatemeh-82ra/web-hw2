// src/components/Sidebar.js
import React from 'react';

const SHAPES = [
    { id: 'circle', label: '● Circle' }, // Using text symbols for simplicity
    { id: 'square', label: '■ Square' },
    { id: 'triangle', label: '▲ Triangle' },
];

function Sidebar({ selectedShapeTool, onSelectShapeTool }) {
    return (
        <aside className="app-sidebar">
            <h3>Tools</h3>
            {SHAPES.map(shape => (
                <div
                    key={shape.id}
                    className={`shape-tool ${selectedShapeTool === shape.id ? 'selected' : ''}`}
                    onClick={() => onSelectShapeTool(shape.id)}
                    title={`Select ${shape.id}`}
                >
                    {/* You can use SVG icons or styled divs for better visuals */}
                    {shape.id === 'circle' && <div className="tool-icon circle-icon"></div>}
                    {shape.id === 'square' && <div className="tool-icon square-icon"></div>}
                    {shape.id === 'triangle' && <div className="tool-icon triangle-icon"></div>}
                    {/* <p>{shape.label}</p> */}
                </div>
            ))}
        </aside>
    );
}

export default Sidebar;