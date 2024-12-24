import React, { useState } from 'react';
import './RequestModal.css'; // Your CSS for styling
import { postRequest } from '../services/api';

const RequestModal = ({ isOpen, closeRequestModal, onSubmit, vehicles, batteries }) => {
    if (!isOpen) return null;

    const [filter, setFilter] = useState('vehicle'); // Initialize with default filter
    const [request, setRequest] = useState({
        requestType: 'vehicle',
        vehicle: null,
        battery: null,
        distance: 50,
    });

    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        setFilter(newFilter);
        setRequest((prevRequest) => ({ ...prevRequest, requestType: newFilter, vehicle: null, battery: null }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
    };

    const handleDistanceChange = (e) => {
        const distance = e.target.value;
        setRequest((prevRequest) => ({ ...prevRequest, distance }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(request); // Pass the created request to Home.jsx
    };

    return (
        <div className="requestModal-overlay">
            <div className="requestModal-content">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Request Type
                        </label>
                        <div className="flex items-center">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="filter"
                                    value="vehicle"
                                    checked={filter === 'vehicle'}
                                    onChange={handleFilterChange}
                                />{" "}
                                Vehicle
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="filter"
                                    value="battery"
                                    checked={filter === 'battery'}
                                    onChange={handleFilterChange}
                                />{" "}
                                Battery
                            </label>
                        </div>
                    </div>

                    {/* Request Vehicle Form */}
                    {filter === 'vehicle' && (
                        <div>
                            <div className="mb-4">
                                <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle
                                </label>
                                <select id="vehicle" name="vehicle" className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                                    value={request.vehicle || ""}
                                    onChange={handleChange}>
                                    <option value="">Select a vehicle</option>
                                    {vehicles.map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.brand} {v.model}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Request Battery Form */}
                    {filter === 'battery' && (
                        <div>
                            <div className="mb-4">
                                <label htmlFor="battery" className="block text-gray-700 text-sm font-bold mb-2">
                                    Battery
                                </label>
                                <select
                                    id="battery"
                                    name="battery"
                                    className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                                    value={request.battery || ""}
                                    onChange={handleChange}>
                                    <option value="">Select a battery</option>
                                    {batteries.map((b) => (
                                        <option key={b.id} value={b.id}>
                                            {b.modelNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distance">
                            Distance
                        </label>
                        <input
                            type="range"
                            id="distance"
                            name="distance"
                            className="w-full accent-indigo-600 capacity-container"
                            min="1"
                            max="200"
                            value={request.distance || 0}
                            onChange={handleDistanceChange}
                        />
                        <div className="flex justify-between text-gray-500">
                            <span>{request.distance || 0} Km</span>
                            <span>200 Km</span>
                        </div>
                    </div>

                    <div className="requestModal-buttons flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="cancel-requestModal bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={closeRequestModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-requestModal bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestModal;