import React, { useState, useEffect } from "react";
import "../App.css";
import './Home.css';
import { useNavigate, Route, Routes } from 'react-router-dom';
import AddEntity from "./AddEntity";
import Experience from "./Experience";
import ViewEntities from "./ViewEntities";
import LinkSidebar from "../components/LinkSidebar";
import RequestModal from "../components/RequestModal";
import ForceGraph from "../components/ForceGraph";
import { fetchVehicles, fetchChargingStations, fetchBatteries, fetchSolarPanels, fetchExperiences, fetchRequests } from "../services/api";

const Home = () => {
    const [selectedNode, setSelectedNode] = useState(null);  // Track selected node
    const [selectedLink, setSelectedLink] = useState(null);  // Track selected link
    const [selectedFeedback, setSelectedFeedback] = useState({
        positive: false,
        negative: false,
    });
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false); // Modal open state
    const [requests, setRequests] = useState([]);

    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedDistance, setSelectedDistance] = useState('');

    const [vehicles, setVehicles] = useState([]);
    const [batteries, setBatteries] = useState([]);
    const [solarPanels, setSolarPanels] = useState([]);
    const [chargingStations, setChargingStations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true); // Controls the visibility of the sidebar

    const navigate = useNavigate();

    // Fetch data for vehicles and charging stations
    useEffect(() => {
        const fetchData = async () => {
            try {
                const vehicleData = await fetchVehicles(); // Fetch vehicles
                setVehicles(vehicleData);

                const stationData = await fetchChargingStations(); // Fetch charging stations
                setChargingStations(stationData);

                const batteriesData = await fetchBatteries();
                setBatteries(batteriesData);

                const solarPanels = await fetchSolarPanels();
                setSolarPanels(solarPanels);

                const experienceData = await fetchExperiences();
                setExperiences(experienceData);

                const requestData = await fetchRequests();
                setRequests(requestData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleFeedbackChange = (event) => {
        const { value, checked } = event.target;
        setSelectedFeedback((prevState) => ({
            ...prevState,
            [value]: checked,
        }));
    };

    const handleBackClick = () => {
        setSelectedNode(null);
        setShowSidebar(false); // Hide the sidebar when back is clicked
        setSelectedLink(null);
    };


    //LinkSidebar display
    const handleLinkClick = (linkData) => {
        const station = linkData.target;
        const vehicle = linkData.source;

        let stationId = station.id;
        let vehicleId = vehicle.id;

        let resultStation = stationId.replace(/\D/g, '');
        let resultVehicle = vehicleId.replace(/\D/g, '');

        let numStation = parseInt(resultStation, 10);
        let numVehicle = parseInt(resultVehicle, 10);

        console.log("Station", station);
        console.log("Vehicle", vehicle);

        const relatedExperiences = experiences.filter(
            (exp) => exp.vehicle.id === numVehicle && exp.chargingStation.id === numStation
        );

        console.log("Related Experiences:", relatedExperiences);


        setSelectedLink({ vehicle, station, experiences: relatedExperiences });
        setShowSidebar(true);
    };

    const handleAddEntityClick = () => navigate('/add-entity');
    const handleViewEntitiesClick = () => navigate('/view-entities');;
    const handleExperienceClick = () => navigate('/experience');
    const handleRequestClick = () => setIsRequestModalOpen(true);
    const closeRequestModal = () => setIsRequestModalOpen(false);



    const handleSubmit = (newRequest) => {
        setRequests((prevRequests) => [...prevRequests, newRequest]);
        console.log("New Request: ", newRequest);
        closeRequestModal();
    };

    return (
        <div className="App">
            <div className="sidebar">
                <div className="checkbox-container">
                    <div className="filter-card">
                        <label className="block text-gray-700 text-lg font-bold mb-4" htmlFor="filterByFeedback">
                            Filter By Feedback
                        </label>
                        <div className="flex items-center mb-4">
                            <input
                                id="positive-checkbox"
                                type="checkbox"
                                value="positive"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={handleFeedbackChange}
                            />
                            <label htmlFor="positive-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                                Positive
                            </label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                id="negative-checkbox"
                                type="checkbox"
                                value="negative"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={handleFeedbackChange}
                            />
                            <label htmlFor="negative-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                                Negative
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="neutral-checkbox"
                                type="checkbox"
                                value="neutral"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                onChange={handleFeedbackChange}
                            />
                            <label htmlFor="neutral-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                                Neutral
                            </label>
                        </div>
                    </div>

                    <div className="filter-card">
                        <div className="button-sidebar-container">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l button-sidebar" onClick={handleAddEntityClick}>
                                Add Entity
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleViewEntitiesClick}>
                                View Entities
                            </button>

                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleExperienceClick}>
                                Experience
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleRequestClick}>
                                Request
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
                {/* Requests Section */}
                <div className="requests-section">
                    <h3 className="text-lg font-bold mb-4">Requests</h3>
                    <div className="requests-cards">
                        {requests.map((req, index) => (
                            <div key={index} className="request-card bg-gray-200 p-4 mb-2 rounded">
                                <p className="text-sm font-medium text-gray-800">Type: {req.requestType}</p>
                                {req.vehicle && (
                                    <p className="text-sm text-gray-600">Vehicle: {req.vehicle.brand} {req.vehicle.model}</p>
                                )}
                                {req.battery && (
                                    <p className="text-sm text-gray-600">Battery: {req.battery.modelNumber}</p>
                                )}
                                <p className="text-sm text-gray-600">Distance: {req.distance} km</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="graph-container">
                <ForceGraph
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    selectedFeedback={selectedFeedback}
                    selectedVehicle={selectedVehicle}
                    setSelectedVehicle={setSelectedVehicle}
                    setSelectedDistance={setSelectedDistance}
                    onLinkClick={handleLinkClick}
                />
            </div>

            {/* Conditionally render the LinkSidebar component based on selectedLink */}
            {showSidebar && selectedLink && (
                <LinkSidebar selectedLink={selectedLink} handleBackClick={handleBackClick} />
            )}

            {/* Modal Component */}
            <RequestModal
                isOpen={isRequestModalOpen}
                closeRequestModal={closeRequestModal}
                vehicles={vehicles}
                batteries={batteries}
                onSubmit={handleSubmit} />

            <Routes>
                <Route path="/add-entity" element={<AddEntity />} />
                <Route path="/view-entities" element={<ViewEntities />} />
                <Route path="/experience" element={<Experience />} />
            </Routes>
        </div>
    );
};

export default Home;
