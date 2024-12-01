import React, { useState, useEffect } from "react";
import ForceGraph from "../components/ForceGraph";
import "../App.css"; // Import your CSS
import { useNavigate } from 'react-router-dom';
import AddEntity from "./AddEntity"; // Import AddEntity page
import ListStations from "./ListStations"; // Import ListStations page
import { Route, Routes } from 'react-router-dom';
import './Home.css';
import Experience from "./Experience";
import Modal from "../components/Modal";
import axios from 'axios';
import { fetchVehicles, fetchChargingStations } from "../services/api";

const Home = () => {
    const [selectedNode, setSelectedNode] = useState(null);  // Track selected node
    const navigate = useNavigate();
    const [selectedFeedback, setSelectedFeedback] = useState({
        positive: false,
        negative: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
    const [request, setRequest] = useState({
        vehicle: '',
        chargeMode: true, // Assume true for fast charging by default
        distance: 100,
    });

    const [vehicles, setVehicles] = useState([]);
    const [chargingStations, setChargingStations] = useState([]);

    // Fetch data for vehicles and charging stations
    useEffect(() => {
        const fetchData = async () => {
            try {
                const vehicleData = await fetchVehicles(); // Fetch vehicles
                setVehicles(vehicleData);

                const stationData = await fetchChargingStations(); // Fetch charging stations
                setChargingStations(stationData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const updateRequest = (updatedRequest) => {
        setRequest(updatedRequest);
    };

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

    // Routes for navigating to different pages
    const handleAddEntityClick = () => {
        navigate('/add-entity');
    };

    const handleListStationsClick = () => {
        navigate('/list-stations');
    };

    const handleExperienceClick = () => {
        navigate('/experience');
    };

    const handleRequestClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        console.log('Form submitted with request:', request);
        closeModal();
    };

    return (
        <div className="App">
            <div className="sidebar">
                {/* Filter section */}
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

                    {/* Other filters (e.g., by entity) go here */}
                    <div className="filter-card">
                        <div className="button-sidebar-container">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l button-sidebar" onClick={handleAddEntityClick}>
                                Add Entity
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleListStationsClick}>
                                View Entities
                            </button>

                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleExperienceClick}>
                                Experience
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleRequestClick}>
                                Request
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
                <ForceGraph selectedNode={selectedNode} setSelectedNode={setSelectedNode} selectedFeedback={selectedFeedback} />
            </div>

            {/* Modal Component */}
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                onSubmit={handleSubmit}
                request={request}
                vehicles={vehicles}
                updateRequest={updateRequest}
            />

            <Routes>
                <Route path="/add-entity" element={<AddEntity />} />
                <Route path="/list-stations" element={<ListStations />} />
                <Route path="/experience" element={<Experience />} />
            </Routes>
        </div>
    );
};

export default Home;