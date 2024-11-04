import React, { useState } from "react";
import ForceGraph from "../components/ForceGraph";
import ContractsGraph from "../components/ContractsForceGraph"; // Import ContractsGraph component
import "../App.css"; // Import your CSS
import { useNavigate } from 'react-router-dom';
import AddStation from "./AddStation"; // Import AddStation page
import ListStations from "./ListStations"; // Import ListStations page
import { Route, Routes } from 'react-router-dom';

const Home = () => {
    const [selectedRegions, setSelectedRegions] = useState(new Set());
    const [selectedEnergyTypes, setSelectedEnergyTypes] = useState(new Set());
    const [carbonFootprintValue, setCarbonFootprintValue] = useState(0);
    const [selectedNode, setSelectedNode] = useState(null);
    const navigate = useNavigate();

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

    const handleNodeClick = (node) => {
        setSelectedNode(node);
    };

    const handleBackClick = () => {
        setSelectedNode(null);
    };

    // Routes
    const handleAddStationClick = () => {
        navigate('/add-station');
    };

    const handleListStationsClick = () => {
        navigate('/list-stations');
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
                                value="North"
                                onChange={handleRegionChange}
                            />
                            North
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="South"
                                onChange={handleRegionChange}
                            />
                            South
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="East"
                                onChange={handleRegionChange}
                            />
                            East
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Oeste"
                                onChange={handleRegionChange}
                            />
                            West
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
                        <div className="button-sidebar-container">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l button-sidebar"
                                onClick={handleAddStationClick}>
                                Add Station
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={handleListStationsClick}>
                                View Stations
                            </button>
                        </div>
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
            <Routes>
                <Route path="/add-station" element={<AddStation />} />
                <Route path="/list-stations" element={<ListStations />} />
            </Routes>
        </div>
    );
};

export default Home;
