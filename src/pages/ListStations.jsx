import React, { useEffect, useState } from 'react';
import './ListStations.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ListStations() {
    const [stations, setStations] = useState([]); // Initialize as an empty array

    useEffect(() => {
        loadStations();
    }, []);

    const loadStations = async () => {
        try {
            const result = await axios.get("http://localhost:8888/stations");
            setStations(result.data);
        } catch (error) {
            console.error("Error loading stations:", error);
            // Optionally set stations to an empty array if there's an error
            setStations([]);
        }
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
                            <th className="px-4 py-2">Brand</th> {/* Ensure this matches your data */}
                            <th className="px-4 py-2">TimeZone</th> {/* Ensure this matches your data */}
                        </tr>
                    </thead>
                    <tbody>
                        {stations.length > 0 ? ( // Check if stations has any items
                            stations.map((station, index) => (
                                <tr key={index}> {/* Added key here to avoid warning */}
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{station.brand}</td>
                                    <td className="border px-4 py-2">{station.timeZone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="border px-4 py-2 text-center">No stations available</td> {/* Message when no stations are found */}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
