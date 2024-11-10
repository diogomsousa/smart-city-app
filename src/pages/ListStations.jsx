import React, { useEffect, useState } from 'react';
import './ListStations.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ListStations() {
    const [stations, setStations] = useState([]); // Initialize as an empty array

    const { id } = useParams();

    useEffect(() => {
        loadStations();
    }, []);

    const loadStations = async () => {
        const result = await axios.get("http://localhost:8888/stations");
        setStations(result.data);
    };

    const deleteStation = async (id) => {
        await axios.delete(`http://localhost:8888/charging_station/${id}`);
        loadStations();
    };


    const navigate = useNavigate();

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
                {/* Additional content for adding a station can go here */}
            </div>

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
                            <th className="px-4 py-2">Connector Types</th>
                            <th className="px-4 py-2">Payment Model</th>
                            <th className="px-4 py-2">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.length > 0 ? (
                            stations.map((station, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{station.locationType}</td>
                                    <td className="border px-4 py-2">{station.zipCode}</td>
                                    <td className="border px-4 py-2">{station.city}</td>
                                    <td className="border px-4 py-2">{station.chargingStandard}</td>
                                    <td className="border px-4 py-2">{station.voltageSupported}</td>
                                    <td className="border px-4 py-2">{station.energyDelivered}</td>
                                    <td className="border px-4 py-2">{station.connectorTypes}</td>
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
                                <td colSpan="5" className="border px-4 py-2 text-center">No stations available</td> {/* Message when no stations are found */}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
