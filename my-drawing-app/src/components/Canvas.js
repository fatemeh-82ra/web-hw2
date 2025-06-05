// src/components/Canvas.js
import React, { useState } from 'react'; // Added useState for drag-over visual feedback
import Shape from './Shape';

// Renamed onCanvasClick to onCanvasRawClick to avoid confusion if it's only for specific click actions not related to DND shape adding.
// Added onShapeDrop prop to handle the drop event.
function Canvas({ shapes, onCanvasRawClick, onShapeDoubleClick, onShapeDrop }) {
    const [isDraggingOver, setIsDraggingOver] = useState(false); // State for visual feedback

    const handleCanvasClickInternal = (event) => {
        // CRITICAL FIX: Check if the element that was directly clicked is the canvas itself
        if (event.target !== event.currentTarget) {
            console.log("Canvas click detected, but target was a child (a Shape). No new shape added by canvas click."); //
            return;
        }

        // If a raw canvas click handler is provided (e.g., for deselecting or other purposes), call it.
        // The original onCanvasClick was for adding shapes based on selectedShapeTool.
        // If you still want that functionality, ensure onCanvasRawClick (which is addShapeToCanvasOnClick from App.js) handles it.
        if (onCanvasRawClick) {
            const rect = event.currentTarget.getBoundingClientRect(); //
            const x = event.clientX - rect.left; //
            const y = event.clientY - rect.top; //
            onCanvasRawClick(x, y); // This would call addShapeToCanvasOnClick from App.js
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // This is crucial to allow a drop
        event.dataTransfer.dropEffect = "copy"; // Explicitly show a copy cursor
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const shapeType = event.dataTransfer.getData("application/react-shape-tool-type"); // Retrieve the stored shape type

        if (shapeType && onShapeDrop) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            onShapeDrop(shapeType, x, y); // Call the handler passed from App.js
        }
    };

    return (
        <div
            className={`canvas-area ${isDraggingOver ? 'drag-over' : ''}`} // Dynamically add class for styling
            onClick={handleCanvasClickInternal}
            onDragOver={handleDragOver} // Handle when a draggable item is over the canvas
            onDragLeave={handleDragLeave} // Handle when a draggable item leaves the canvas
            onDrop={handleDrop}           // Handle the drop event
        >
            <p className="canvas-placeholder">{shapes.length === 0 ? 'Canvas' : ''}</p> {/* */}
            {shapes.map(shape => (
                <Shape
                    key={shape.id} //
                    id={shape.id} //
                    type={shape.type} //
                    x={shape.x} //
                    y={shape.y} //
                    onDoubleClick={onShapeDoubleClick} //
                />
            ))}
        </div>
    );
}

export default Canvas;