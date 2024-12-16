// RequestForm.js
import React from 'react';

export default function RequestForm({ request, vehicles, updateRequest }) {
    const { vehicle, chargeMode } = request;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateRequest({
            ...request,
            [name]: name === "chargeMode" ? value === "true" : value,
        });
    };

    // const updateDistance = (e) => {
    //     const value = parseInt(e.target.value, 10); // Ensure it's a number
    //     updateRequest({
    //         ...request,
    //         distance: value, // Specifically update the distance
    //     });
    // };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="chargingStation" className="block text-gray-700 text-sm font-bold mb-2">
                    Select a need type
                </label>
                <select
                    id="chargingStation"
                    name="chargingStation"
                    className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700">
                    <option value="">Select a need type</option>
                    <option value="">Vehicle</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
                    Vehicle
                </label>
                <select
                    id="vehicle"
                    name="vehicle"
                    className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                    value={vehicle}
                    onChange={handleChange}>
                    <option value="">Select a vehicle</option>
                    {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.brand} {v.model}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="chargeMode" className="block text-gray-700 text-sm font-bold mb-2">
                    Charge Mode
                </label>
                <div className="flex items-center">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="chargeMode"
                            value="true"
                            checked={chargeMode === true}
                            onChange={handleChange}
                        />{" "}
                        Fast Charging
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="chargeMode"
                            value="false"
                            checked={chargeMode === false}
                            onChange={handleChange}
                        />{" "}
                        Slow Charging
                    </label>
                </div>
            </div>

            {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distance">
                    Distance
                </label>
                <input
                    type="range"
                    id="distance"
                    name="distance"
                    className="w-full accent-indigo-600 capacity-container"
                    min="20"
                    max="500"
                    value={distance}
                    onChange={updateDistance}
                />
                <div className="flex justify-between text-gray-500">
                    <span>{distance} Km</span>
                    <span>500 Km</span>
                </div>
            </div> */}
        </div>
    );
}