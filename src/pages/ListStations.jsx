import React, { useEffect, useState } from 'react';
import './ListStations.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ListStations() {
    const [stations, setStations] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch Stations
    useEffect(() => {
        const loadStations = async () => {
            try {
                const result = await axios.get("http://localhost:8888/stations");
                setStations(result.data);
            } catch (error) {
                console.error("Error loading stations", error);
            }
        };
        loadStations();
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    // Fetch Vehicles
    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const result = await axios.get("http://localhost:8888/vehicles");
                setVehicles(result.data);
            } catch (error) {
                console.error("Error loading vehicles", error);
            }
        };
        loadVehicles();
    }, []);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                const result = await axios.get("http://localhost:8888/experiences");
                setExperiences(result.data);
            } catch (error) {
                console.error("Error loading experiences", error);
            }
        };
        loadExperiences();
    }, []);

    const deleteStation = async (id) => {
        await axios.delete(`http://localhost:8888/stations/${id}`);
        setStations(stations.filter(station => station.id !== id));
    };

    const deleteVehicle = async (id) => {
        await axios.delete(`http://localhost:8888/vehicles/${id}`);
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    };

    const deleteExperience = async (id) => {
        await axios.delete(`http://localhost:8888/experiences/${id}`);
        setVehicles(experiences.filter(experience => experience.id !== id));
    };


    // Handle Back to Home
    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div>
            <div>
                <button
                    onClick={handleBackToHome}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button">
                    Back
                </button>
            </div>

            {/* Stations Table */}
            <div className='container mx-auto table-stations'>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Location Type</th>
                            <th className="px-4 py-2">Zip Code</th>
                            <th className="px-4 py-2">City</th>
                            <th className="px-4 py-2">Charging Standard</th>
                            <th className="px-4 py-2">Voltage Supported</th>
                            <th className="px-4 py-2">Energy delivered</th>
                            <th className="px-4 py-2">Connector Type</th>
                            <th className="px-4 py-2">Payment Model</th>
                            <th className="px-4 py-2">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.length > 0 ? (
                            stations.map((station, index) => (
                                <tr key={station.id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{station.locationType}</td>
                                    <td className="border px-4 py-2">{station.zipCode}</td>
                                    <td className="border px-4 py-2">{station.city}</td>
                                    <td className="border px-4 py-2">{station.chargingStandard}</td>
                                    <td className="border px-4 py-2">{station.voltageSupported}</td>
                                    <td className="border px-4 py-2">{station.energyDelivered}</td>
                                    <td className="border px-4 py-2">{station.connectorType}</td>
                                    <td className="border px-4 py-2">{station.paymentModel}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                            onClick={() => deleteStation(station.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="border px-4 py-2 text-center">No stations available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Vehicles Table */}
            <div className='container mx-auto table-vehicles'>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Brand</th>
                            <th className="px-4 py-2">Model</th>
                            <th className="px-4 py-2">Port Location</th>
                            <th className="px-4 py-2">Battery Capacity</th>
                            <th className="px-4 py-2">Thermal System</th>
                            <th className="px-4 py-2">Connector Type</th>
                            <th className="px-4 py-2">Charging Behavior</th>
                            <th className="px-4 py-2">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.length > 0 ? (
                            vehicles.map((vehicle, index) => (
                                <tr key={vehicle.id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{vehicle.brand}</td>
                                    <td className="border px-4 py-2">{vehicle.model}</td>
                                    <td className="border px-4 py-2">{vehicle.portLocation}</td>
                                    <td className="border px-4 py-2">{vehicle.batteryCapacity}</td>
                                    <td className="border px-4 py-2">{vehicle.thermalSystem}</td>
                                    <td className="border px-4 py-2">{vehicle.connectorType}</td>
                                    <td className="border px-4 py-2">{vehicle.chargingBehavior}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                            onClick={() => deleteVehicle(vehicle.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="border px-4 py-2 text-center">No vehicles available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Experiences Table */}
            <div className='container mx-auto table-vehicles'>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Vehicle</th>
                            <th className="px-4 py-2">Charging Station</th>
                            <th className="px-4 py-2">Feedback</th>
                            <th className="px-4 py-2">Time Ago</th>
                            <th className="px-4 py-2">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences.length > 0 ? (
                            experiences.map((experience, index) => (
                                <tr key={experience.id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{experience.vehicle.brand}</td>
                                    <td className="border px-4 py-2">{experience.chargingStation.zipCode}</td>
                                    <td className="border px-4 py-2">
                                        {experience.feedback ? "Positive" : "Negative"}
                                    </td>
                                    <td className="border px-4 py-2">{experience.timeAgo}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                            onClick={() => deleteExperience(experience.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="border px-4 py-2 text-center">No experiences available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
