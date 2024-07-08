import React, { useState } from "react";
import ForceGraph from "./components/ForceGraph";
import CarbonFilter from "./components/CarbonFilter";
import ContractsGraph from "./components/ContractsForceGraph"; // Import ContractsGraph component
import "./App.css";

function App() {
  const [selectedRegions, setSelectedRegions] = useState(new Set());
  const [selectedEnergyTypes, setSelectedEnergyTypes] = useState(new Set());
  const [carbonFootprintValue, setCarbonFootprintValue] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null); // State to track selected node

  const handleRegionChange = (event) => {
    const region = event.target.value;
    const updatedSelectedRegions = new Set(selectedRegions);
    if (updatedSelectedRegions.has(region)) {
      updatedSelectedRegions.delete(region);
    } else {
      updatedSelectedRegions.add(region);
    }
    setSelectedRegions(updatedSelectedRegions);
  };

  const handleEnergyTypeChange = (event) => {
    const energyType = event.target.value;
    const updatedSelectedEnergyTypes = new Set(selectedEnergyTypes);
    if (updatedSelectedEnergyTypes.has(energyType)) {
      updatedSelectedEnergyTypes.delete(energyType);
    } else {
      updatedSelectedEnergyTypes.add(energyType);
    }
    setSelectedEnergyTypes(updatedSelectedEnergyTypes);
  };

  const handleCarbonFootprintChange = (value) => {
    setCarbonFootprintValue(value);
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleBackClick = () => {
    setSelectedNode(null); // Reset selectedNode to null to show ForceGraph
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="checkbox-container">
          <div className="filter-card">
            <h2>Filter by Region</h2>
            <label>
              <input
                type="checkbox"
                value="Norte"
                onChange={handleRegionChange}
              />
              Norte
            </label>
            <label>
              <input
                type="checkbox"
                value="Sul"
                onChange={handleRegionChange}
              />
              Sul
            </label>
            <label>
              <input
                type="checkbox"
                value="Este"
                onChange={handleRegionChange}
              />
              Este
            </label>
            <label>
              <input
                type="checkbox"
                value="Oeste"
                onChange={handleRegionChange}
              />
              Oeste
            </label>
          </div>
          <div className="filter-card">
            <h2>Filter by Energy Type</h2>
            <label>
              <input
                type="checkbox"
                value="Solar"
                onChange={handleEnergyTypeChange}
              />
              Solar
            </label>
            <label>
              <input
                type="checkbox"
                value="Eólica"
                onChange={handleEnergyTypeChange}
              />
              Eólica
            </label>
            <label>
              <input
                type="checkbox"
                value="Nuclear"
                onChange={handleEnergyTypeChange}
              />
              Nuclear
            </label>
            <label>
              <input
                type="checkbox"
                value="Hidrelétrica"
                onChange={handleEnergyTypeChange}
              />
              Hidrelétrica
            </label>
          </div>
          <div className="filter-card">
            <CarbonFilter
              carbonFootprintValue={carbonFootprintValue}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          {selectedNode && (
            <div className="button-container">
              <button className="action-button" onClick={handleBackClick}>
                Back
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="graph-container">
        {selectedNode ? (
          <ContractsGraph selectedNode={selectedNode} />
        ) : (
          <ForceGraph
            selectedRegions={selectedRegions}
            selectedEnergyTypes={selectedEnergyTypes}
            carbonFootprintValue={carbonFootprintValue}
            onNodeClick={handleNodeClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
