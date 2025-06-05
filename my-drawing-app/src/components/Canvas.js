// src/components/Canvas.js
import React from 'react';
import Shape from './Shape';

function Canvas({ shapes, onCanvasClick, onShapeDoubleClick }) {
    const handleCanvasClick = (event) => {
        // CRITICAL FIX:
        // Check if the element that was directly clicked (event.target)
        // is the same as the element this event listener is attached to (event.currentTarget).
        // If they are not the same, it means a child element (like a Shape) was clicked.
        // In that case, we don't want to add a new shape.
        if (event.target !== event.currentTarget) {
            console.log("Canvas click detected, but target was a child (a Shape). No new shape added by canvas click.");
            return; // Exit without adding a new shape
        }

        // If the click was directly on the canvas, proceed to add the shape
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        onCanvasClick(x, y); // This calls addShapeToCanvas from App.js
    };

    return (
        <div className="canvas-area" onClick={handleCanvasClick}> {/* onClick is now smarter */}
            <p className="canvas-placeholder">{shapes.length === 0 ? 'Canvas' : ''}</p>
            {shapes.map(shape => (
                <Shape
                    key={shape.id}
                    id={shape.id}
                    type={shape.type}
                    x={shape.x}
                    y={shape.y}
                    onDoubleClick={onShapeDoubleClick} // This is removeShapeFromCanvas from App.js
                />
            ))}
        </div>
    );
}

export default Canvas;