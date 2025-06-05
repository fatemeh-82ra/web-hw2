// src/components/Shape.js
import React from 'react';

function Shape({ id, type, x, y, onDoubleClick }) {
    const style = {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        // Adjust positioning if x,y should be center of shape
        transform: 'translate(-50%, -50%)', // Centers the shape on the click point
        cursor: 'pointer',
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation(); // Prevent canvas click from firing
        onDoubleClick(id);
    };

    // Basic visual representation. You'd use SVGs or more CSS for better shapes.
    // These are very basic placeholder styles.
    const shapeStyle = {
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black', // Default border
    };

    if (type === 'circle') {
        return (
            <div
                style={{ ...style, ...shapeStyle, borderRadius: '50%', backgroundColor: 'lightblue' }}
                onDoubleClick={handleDoubleClick}
                title={`Circle at (${x},${y})`}
            >
                {/* Circle */}
            </div>
        );
    } else if (type === 'square') {
        return (
            <div
                style={{ ...style, ...shapeStyle, backgroundColor: 'lightgreen' }}
                onDoubleClick={handleDoubleClick}
                title={`Square at (${x},${y})`}
            >
                {/* Square */}
            </div>
        );
    } else if (type === 'triangle') {
        // CSS triangles are a bit more complex, or use SVG
        return (
            <div
                style={{
                    ...style,
                    width: 0,
                    height: 0,
                    borderLeft: '25px solid transparent',
                    borderRight: '25px solid transparent',
                    borderBottom: '50px solid lightcoral',
                    // No background needed for basic CSS triangle
                }}
                onDoubleClick={handleDoubleClick}
                title={`Triangle at (${x},${y})`}
            >
                {/* Triangle */}
            </div>
        );
    }

    return null; // Or some default representation
}

export default Shape;