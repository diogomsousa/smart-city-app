import React, { useState } from "react";
import ForceGraph from "../components/ForceGraph";
import "../App.css"; // Import your CSS
import { useNavigate } from 'react-router-dom';
import AddEntity from "./AddEntity"; // Import AddEntity page
import ListStations from "./ListStations"; // Import ListStations page
import { Route, Routes } from 'react-router-dom';
import './Home.css';
import Experience from "./Experience";

const Home = () => {

    const [selectedNode, setSelectedNode] = useState(null);  // Track selected node
    const navigate = useNavigate();

    const [selectedFeedback, setSelectedFeedback] = useState({
        positive: false,
        negative: false,
    });

    const handleFeedbackChange = (event) => {
        const { value, checked } = event.target;
        setSelectedFeedback((prevState) => ({
            ...prevState,
            [value]: checked,
        }));
    };

    const handleBackClick = () => {
        setSelectedNode(null); // Reset the selected node when clicking "Back"
    };

    // Routes
    const handleAddEntityClick = () => {
        navigate('/add-entity');
    };

    const handleListStationsClick = () => {
        navigate('/list-stations');
    };

    const handleExperienceClick = () => {
        navigate('/experience')
    }

    return (
        <div className="App">
            <div className="sidebar">
                <div className="checkbox-container">
                    <div className="filter-card">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="filterByFeedback">
                            Filter By Feedback
                        </label>
                        <div className="flex items-center">
                            <input
                                id="positive-checkbox"
                                type="checkbox"
                                value="positive"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={handleFeedbackChange}
                            />
                            <label htmlFor="positive-checkbox" className="ms-2 text-sm font-medium text-gray-900"> Positive </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="negative-checkbox"
                                type="checkbox"
                                value="negative"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={handleFeedbackChange}
                            />
                            <label htmlFor="negative-checkbox" className="ms-2 text-sm font-medium text-gray-900"> Negative </label>
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

                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={handleExperienceClick}>
                                Experience
                            </button>

                            {/* Render the "Back" button if a node is selected */}
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
                {/* Pass selectedNode and setSelectedNode to ForceGraph */}
                <ForceGraph
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode} // Update this when a node is selected
                    selectedFeedback={selectedFeedback}
                />
            </div>
            <Routes>
                <Route path="/add-entity" element={<AddEntity />} />
                <Route path="/list-stations" element={<ListStations />} />
                <Route path="/experience" element={<Experience />} />
            </Routes>
        </div>
    );
};

export default Home;
