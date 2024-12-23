import React, { useState } from 'react';

export default function RequestForm({ vehicles, batteries, request, updateRequest }) {
    const { vehicle, distance, battery, requestType } = request;

    const [filter, setFilter] = useState(requestType || 'vehicle'); // Default to requestType from props

    // This function handles changes for vehicle and battery selections
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateRequest({
            ...request,
            [name]: value,
        });
    };

    const handleDistanceChange = (e) => {
        const value = e.target.value;
        updateRequest({
            ...request,
            distance: value,
        });
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;

        // If switching from vehicle to battery or vice versa, reset the other field
        if (selectedFilter === 'vehicle') {
            updateRequest({
                ...request,
                requestType: selectedFilter,
                battery: null, // Reset battery
            });
        } else if (selectedFilter === 'battery') {
            updateRequest({
                ...request,
                requestType: selectedFilter,
                vehicle: null, // Reset vehicle
            });
        }

        setFilter(selectedFilter); // Update the filter state
    };

    return (
        <div>
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
                            onChange={handleFilterChange} // Update filter and requestType
                        />{" "}
                        Vehicle
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="filter"
                            value="battery"
                            checked={filter === 'battery'}
                            onChange={handleFilterChange} // Update filter and requestType
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
                        <select
                            id="vehicle"
                            name="vehicle"
                            className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                            value={vehicle}
                            onChange={handleChange}
                        >
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
                            value={battery}
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
                    value={distance}
                    onChange={handleDistanceChange}
                />
                <div className="flex justify-between text-gray-500">
                    <span>{distance} Km</span>
                    <span>200 Km</span>
                </div>
            </div>
        </div>
    );
}
