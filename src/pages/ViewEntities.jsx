import React, { useEffect, useState } from 'react';
import './ViewEntities.css';
import { useNavigate } from 'react-router-dom';
import { fetchChargingStations, fetchVehicles, fetchExperiences, deleteStation, deleteVehicle, deleteExperience } from '../services/api';

export default function ViewEntities() {
    const [stations, setStations] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [selectedTable, setSelectedTable] = useState('stations'); // state to control which table to show
    const navigate = useNavigate();

    // Handle Back to Home
    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    const loadData = async (type) => {
        try {
            let data;
            switch (type) {
                case 'stations':
                    data = await fetchChargingStations();
                    setStations(data);
                    break;
                case 'vehicles':
                    data = await fetchVehicles();
                    setVehicles(data);
                    break;
                case 'experiences':
                    data = await fetchExperiences();
                    setExperiences(data);
                    break;
                default:
                    console.error(`Unknown type: ${type}`);
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${type}:`, error);
        }
    };

    useEffect(() => {
        loadData('stations');
        loadData('vehicles');
        loadData('experiences');
    }, []);

    const handleDelete = async (id, type) => {
        try {
            switch (type) {
                case 'station':
                    await deleteStation(id);
                    setStations(stations.filter(station => station.id !== id));
                    break;
                case 'vehicle':
                    await deleteVehicle(id);
                    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
                    break;
                case 'experience':
                    await deleteExperience(id);
                    setExperiences(experiences.filter(experience => experience.id !== id));
                    break;
                default:
                    console.error(`Unknown type: ${type}`);
                    break;
            }
        } catch (error) {
            console.error(`Error deleting ${type} with ID ${id}:`, error);
        }
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

            {/* Centered Buttons */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setSelectedTable('stations')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-2">
                    Stations
                </button>
                <button
                    onClick={() => setSelectedTable('vehicles')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-2">
                    Vehicles
                </button>
                <button
                    onClick={() => setSelectedTable('experiences')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-2">
                    Experiences
                </button>
            </div>

            {/* Conditionally render tables based on selectedTable state */}
            {selectedTable === 'stations' && (
                <div className="container mx-auto table-stations">
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
                                            <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                                onClick={() => handleDelete(station.id, 'station')}>
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
            )}

            {selectedTable === 'vehicles' && (
                <div className="container mx-auto table-vehicles">
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
                                            <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                                onClick={() => handleDelete(vehicle.id, 'vehicle')}>
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
            )}

            {selectedTable === 'experiences' && (
                <div className="container mx-auto table-vehicles">
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
                                            <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                                onClick={() => handleDelete(experience.id, 'experience')}>
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
            )}
        </div>
    );
}
