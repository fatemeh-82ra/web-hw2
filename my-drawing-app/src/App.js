// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import './App.css'; // Main stylesheet

function App() {
  const [drawingName, setDrawingName] = useState('Untitled Drawing');
  const [selectedShapeTool, setSelectedShapeTool] = useState(null); // 'circle', 'square', 'triangle'
  const [shapesOnCanvas, setShapesOnCanvas] = useState([]);

  // Calculate shape counts whenever shapesOnCanvas changes
  const shapeCounts = React.useMemo(() => {
    const counts = { circle: 0, square: 0, triangle: 0 };
    shapesOnCanvas.forEach(shape => {
      if (counts[shape.type] !== undefined) {
        counts[shape.type]++;
      }
    });
    return counts;
  }, [shapesOnCanvas]);

  const addShapeToCanvas = useCallback((x, y) => {
    if (selectedShapeTool) {
      const newShape = {
        id: `${selectedShapeTool}-${Date.now()}`, // Unique ID
        type: selectedShapeTool,
        x: x,
        y: y,
        // You might want to define default sizes here or pass them from the tool
        // For simplicity, we'll let the Shape component handle its rendering size for now
      };
      setShapesOnCanvas(prevShapes => [...prevShapes, newShape]);
    }
  }, [selectedShapeTool]);

  const removeShapeFromCanvas = useCallback((shapeId) => {
    setShapesOnCanvas(prevShapes => prevShapes.filter(shape => shape.id !== shapeId));
  }, []);

  const handleExport = () => {
    const dataToExport = {
      drawingName: drawingName,
      shapes: shapesOnCanvas,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataToExport)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `${drawingName.replace(/\s+/g, '_') || 'drawing'}.json`;
    link.click();
    link.remove();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.drawingName && Array.isArray(importedData.shapes)) {
            setDrawingName(importedData.drawingName);
            setShapesOnCanvas(importedData.shapes);
          } else {
            alert('Invalid JSON file format.');
          }
        } catch (error) {
          alert('Error parsing JSON file: ' + error.message);
        }
      };
      reader.readAsText(file);
      event.target.value = null; // Reset file input
    }
  };

  return (
      <div className="app-container">
        <Header
            drawingName={drawingName}
            onDrawingNameChange={setDrawingName}
            onExport={handleExport}
            onImport={handleImport}
        />
        <div className="main-content">
          <Canvas
              shapes={shapesOnCanvas}
              onCanvasClick={addShapeToCanvas}
              onShapeDoubleClick={removeShapeFromCanvas}
          />
          <Sidebar
              selectedShapeTool={selectedShapeTool}
              onSelectShapeTool={setSelectedShapeTool}
          />
        </div>
        <Footer shapeCounts={shapeCounts} />
      </div>
  );
}

export default App;