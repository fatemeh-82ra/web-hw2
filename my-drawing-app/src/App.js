// src/App.js
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [drawingName, setDrawingName] = useState('Untitled Drawing'); //
  const [selectedShapeTool, setSelectedShapeTool] = useState(null); //
  const [shapesOnCanvas, setShapesOnCanvas] = useState([]); //

  // Calculate shape counts whenever shapesOnCanvas changes
  const shapeCounts = React.useMemo(() => {
    const counts = { circle: 0, square: 0, triangle: 0 }; //
    shapesOnCanvas.forEach(shape => {
      if (counts[shape.type] !== undefined) { //
        counts[shape.type]++; //
      }
    });
    return counts; //
  }, [shapesOnCanvas]);

  // Renamed the original addShapeToCanvas to clarify its trigger (click after selection)
  const addShapeToCanvasOnClick = useCallback((x, y) => {
    if (selectedShapeTool) { //
      const newShape = {
        id: `${selectedShapeTool}-${Date.now()}`, //
        type: selectedShapeTool, //
        x: x, //
        y: y, //
      };
      setShapesOnCanvas(prevShapes => [...prevShapes, newShape]); //
    }
  }, [selectedShapeTool]);

  // New function to add a shape from a drag-and-drop operation
  const addShapeFromDrop = useCallback((shapeType, x, y) => {
    if (shapeType) {
      const newShape = {
        id: `${shapeType}-${Date.now()}`, // Use the dropped shape's type
        type: shapeType,
        x: x,
        y: y,
      };
      setShapesOnCanvas(prevShapes => [...prevShapes, newShape]);
    }
  }, []); // Empty dependency array as it gets all info from arguments

  const removeShapeFromCanvas = useCallback((shapeId) => {
    setShapesOnCanvas(prevShapes => prevShapes.filter(shape => shape.id !== shapeId)); //
  }, []);

  const handleExport = () => { /* ... existing code ... */ }; //
  const handleImport = (event) => { /* ... existing code ... */ }; //

  return (
      <div className="app-container">
        <Header
            drawingName={drawingName} //
            onDrawingNameChange={setDrawingName} //
            onExport={handleExport} //
            onImport={handleImport} //
        />
        <div className="main-content"> {/* */}
          <Canvas
              shapes={shapesOnCanvas} //
              onCanvasRawClick={addShapeToCanvasOnClick} // For click-to-add if still desired
              onShapeDoubleClick={removeShapeFromCanvas} //
              onShapeDrop={addShapeFromDrop}          // Pass the new handler for drop events
          />
          <Sidebar
              selectedShapeTool={selectedShapeTool} //
              onSelectShapeTool={setSelectedShapeTool} //
          />
        </div>
        <Footer shapeCounts={shapeCounts} /> {/* */}
      </div>
  );
}

export default App;