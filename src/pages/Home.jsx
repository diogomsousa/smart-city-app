import React, { useState } from "react";
import ForceGraph from "../components/ForceGraph";
import ContractsGraph from "../components/ContractsForceGraph"; // Import ContractsGraph component
import "../App.css"; // Import your CSS
import { useNavigate } from 'react-router-dom';
import AddEntity from "./AddEntity"; // Import AddEntity page
import ListStations from "./ListStations"; // Import ListStations page
import { Route, Routes } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [selectedLocationTypes, setSelectedLocationTypes] = useState(new Set());
    const [selectedEnergyTypes, setSelectedEnergyTypes] = useState(new Set());
    const [carbonFootprintValue, setCarbonFootprintValue] = useState(0);
    const [selectedNode, setSelectedNode] = useState(null);
    const navigate = useNavigate();

    const handleLocationTypeChange = (event) => {
        const locationType = event.target.value;
        const updatedSelectedLocationTypes = new Set(selectedLocationTypes);
        if (updatedSelectedLocationTypes.has(locationType)) {
            updatedSelectedLocationTypes.delete(locationType);
        } else {
            updatedSelectedLocationTypes.add(locationType);
        }
        setSelectedLocationTypes(updatedSelectedLocationTypes);
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
    const handleAddEntityClick = () => {
        navigate('/add-entity');
    };

    const handleListStationsClick = () => {
        navigate('/list-stations');
    };

    const handleForceGraphClick = () => {
        navigate('/force-graphd3');
    };

    return (
        <div className="App">
            <div className="sidebar">
                <div className="checkbox-container">


                    <div className="filter-card">
                        <h2>Filter by Location Type</h2>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="supermarket"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Supermarket </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="shoppingMall"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Shopping Mall </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="hotel"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Hotel </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="university"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> University </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="parkingLot"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Parking Lot </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="gasStation"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Gas Station </label>
                        </div>
                    </div>
                    <div className="filter-card">
                        <h2>Filter by City</h2>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="guimaraes"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Guimaraes </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="porto"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Porto </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                value="aveiro"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                onChange={handleLocationTypeChange} />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 location-type-checkbox"> Aveiro </label>
                        </div>
                    </div>

                    <div className="filter-card">
                        <div className="button-sidebar-container">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l button-sidebar"
                                onClick={handleAddEntityClick}>
                                Add Entity
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={handleListStationsClick}>
                                View Entities
                            </button>

                            {selectedNode && (
                                <div>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleBackClick}>
                                        Back
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="graph-container">
                {selectedNode ? (
                    <ContractsGraph selectedNode={selectedNode} />
                ) : (
                    <ForceGraph
                        selectedLocationTypes={selectedLocationTypes}
                        selectedEnergyTypes={selectedEnergyTypes}
                        carbonFootprintValue={carbonFootprintValue}
                        onNodeClick={handleNodeClick}
                    />
                )}
            </div>
            <Routes>
                <Route path="/add-entity" element={<AddEntity />} />
                <Route path="/list-stations" element={<ListStations />} />
            </Routes>
        </div>
    );
};

export default Home;
