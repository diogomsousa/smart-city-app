import React, { useEffect, useState } from 'react';
import './ViewEntities.css';
import { useNavigate } from 'react-router-dom';
import { fetchChargingStations, fetchVehicles, fetchBatteries, fetchSolarPanels, fetchExperiences, fetchRequests, deleteStation, deleteVehicle, deleteBattery, deleteSolarPanel, deleteExperience, deleteRequest } from '../services/api';

export default function ViewEntities() {
    const [stations, setStations] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [batteries, setBatteries] = useState([]);
    const [solarPanels, setSolarPanels] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [requests, setRequests] = useState([]);

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
                case 'batteries':
                    data = await fetchBatteries();
                    setBatteries(data);
                    break;
                case 'solarPanels':
                    data = await fetchSolarPanels();
                    setSolarPanels(data);
                    break;
                case 'experiences':
                    data = await fetchExperiences();
                    setExperiences(data);
                    break;
                case 'requests':
                    data = await fetchRequests();
                    setRequests(data);
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
        loadData('batteries');
        loadData('solarPanels');
        loadData('experiences');
        loadData('requests');
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
                case 'battery':
                    await deleteBattery(id);
                    setBatteries(batteries.filter(battery => battery.id !== id));
                    break;
                case 'solarPanel':
                    await deleteSolarPanel(id);
                    setSolarPanels(solarPanels.filter(solarPanel => solarPanel.id !== id));
                    break;
                case 'experience':
                    await deleteExperience(id);
                    setExperiences(experiences.filter(experience => experience.id !== id));
                    break;
                case 'request':
                    await deleteRequest(id);
                    setRequests(requests.filter(request => request.id !== id));
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
                    onClick={() => setSelectedTable('batteries')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-2">
                    Batteries
                </button>
                <button
                    onClick={() => setSelectedTable('solarPanels')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-2">
                    Solar Panels
                </button>
                <button
                    onClick={() => setSelectedTable('experiences')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-2">
                    Experiences
                </button>
                <button
                    onClick={() => setSelectedTable('requests')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-2">
                    Requests
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

            {selectedTable === 'batteries' && (
                <div className="container mx-auto table-vehicles">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Model Number</th>
                                <th className="px-4 py-2">Storage Capacity</th>
                                <th className="px-4 py-2">State Of Charge</th>
                                <th className="px-4 py-2">Min Voltage</th>
                                <th className="px-4 py-2">Max Voltage</th>
                                <th className="px-4 py-2">Min Power Range</th>
                                <th className="px-4 py-2">Max Power Range</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">X</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batteries.length > 0 ? (
                                batteries.map((battery, index) => (
                                    <tr key={battery.id}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{battery.modelNumber}</td>
                                        <td className="border px-4 py-2">{battery.storageCapacity}</td>
                                        <td className="border px-4 py-2">{battery.stateOfCharge}</td>
                                        <td className="border px-4 py-2">{battery.minVoltage}</td>
                                        <td className="border px-4 py-2">{battery.maxVoltage}</td>
                                        <td className="border px-4 py-2">{battery.minPowerRange}</td>
                                        <td className="border px-4 py-2">{battery.maxPowerRange}</td>
                                        <td className="border px-4 py-2">
                                            {battery.status ? "Active" : "Inactive"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                                onClick={() => handleDelete(battery.id, 'battery')}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="border px-4 py-2 text-center">No batteries available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedTable === 'solarPanels' && (
                <div className="container mx-auto table-vehicles">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Model Number</th>
                                <th className="px-4 py-2">Generation Capacity</th>
                                <th className="px-4 py-2">Minimum Voltage</th>
                                <th className="px-4 py-2">Maximum Voltage</th>
                                <th className="px-4 py-2">Conversion Efficiency</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">X</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solarPanels.length > 0 ? (
                                solarPanels.map((solarPanel, index) => (
                                    <tr key={solarPanel.id}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{solarPanel.modelNumber}</td>
                                        <td className="border px-4 py-2">{solarPanel.generationCapacity}</td>
                                        <td className="border px-4 py-2">{solarPanel.minVoltage}</td>
                                        <td className="border px-4 py-2">{solarPanel.maxVoltage}</td>
                                        <td className="border px-4 py-2">{solarPanel.conversionEfficiency}</td>
                                        <td className="border px-4 py-2">
                                            {solarPanel.status ? "Active" : "Inactive"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                                onClick={() => handleDelete(solarPanel.id, 'solarPanel')}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="border px-4 py-2 text-center">No solar panels available</td>
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

            {selectedTable === 'requests' && (
                <div className="container mx-auto table-vehicles">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Request Type</th>
                                <th className="px-4 py-2">Distance</th>
                                <th className="px-4 py-2">Battery</th>
                                <th className="px-4 py-2">Vehicle</th>
                                <th className="px-4 py-2">X</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <tr key={request.id}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{request.requestType}</td>
                                        <td className="border px-4 py-2">{request.distance}</td>
                                        <td className="border px-4 py-2">
                                            {request.battery ? request.battery.modelNumber : 'N/A'}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {request.vehicle ? request.vehicle.brand : 'N/A'}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button"
                                                onClick={() => handleDelete(request.id, 'request')}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="border px-4 py-2 text-center">No requests available</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
}
