// src/components/Sidebar.js
import React from 'react';

const SHAPES = [
    { id: 'circle', label: '● Circle' }, //
    { id: 'square', label: '■ Square' }, //
    { id: 'triangle', label: '▲ Triangle' }, //
];

function Sidebar({ selectedShapeTool, onSelectShapeTool }) {

    const handleDragStart = (event, shapeId) => {
        event.dataTransfer.setData("application/react-shape-tool-type", shapeId); // Use a custom data type to store the shape ID
        event.dataTransfer.effectAllowed = "copy"; // Indicate that the operation is a copy
    };

    return (
        <aside className="app-sidebar">
            <h3>Tools</h3> {/* */}
            {SHAPES.map(shape => (
                <div
                    key={shape.id} //
                    className={`shape-tool ${selectedShapeTool === shape.id ? 'selected' : ''}`} //
                    onClick={() => onSelectShapeTool(shape.id)} //
                    title={`Drag to canvas to add ${shape.id}`} // Updated title for better UX
                    draggable="true" // Make the div draggable
                    onDragStart={(event) => handleDragStart(event, shape.id)} // Handle the start of a drag operation
                >
                    {shape.id === 'circle' && <div className="tool-icon circle-icon"></div>} {/* */}
                    {shape.id === 'square' && <div className="tool-icon square-icon"></div>} {/* */}
                    {shape.id === 'triangle' && <div className="tool-icon triangle-icon"></div>} {/* */}
                </div>
            ))}
        </aside>
    );
}

export default Sidebar;