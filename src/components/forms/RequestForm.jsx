import React from 'react';

export default function RequestForm({ request, vehicles, updateRequest }) {
    const { vehicle, chargeMode, distance } = request;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateRequest({
            ...request,
            [name]: name === "chargeMode" ? value === "true" : value,
        });
    };

    const handleDistanceChange = (e) => {
        const value = e.target.value; // Distance will be the value of the selected option
        updateRequest({
            ...request,
            distance: value, // Update the distance in the request
        });
    };

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
            {/* <div className="mb-4">
                <label htmlFor="distance" className="block text-gray-700 text-sm font-bold mb-2">
                    Select distance
                </label>
                <select
                    id="distance"
                    name="distance"
                    className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                    value={distance}
                    onChange={handleDistanceChange} // Handling the change for distance
                >
                    <option value="">Select distance</option>
                    <option value="200">200 Km</option>
                    <option value="400">400 Km</option>
                    <option value="600">600 Km</option>
                    <option value="800">800 Km</option>
                </select>
            </div> */}

        </div>
    );
}