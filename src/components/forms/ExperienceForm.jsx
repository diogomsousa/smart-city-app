import React from "react";

export default function ExperienceForm({ experience, updateExperience, vehicles, chargingStations }) {
    const { vehicle, chargingStation, feedback, timeAgo } = experience;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateExperience({
            ...experience,
            [name]: name === "feedback" ? value === "true" : value, // Convert string "true"/"false" to boolean
        });
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
                    Vehicle
                </label>
                <select
                    id="vehicle"
                    name="vehicle"
                    className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                    onChange={handleChange}
                    value={vehicle}
                >
                    <option value="">Select a vehicle</option>
                    {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.brand} {v.model}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="chargingStation" className="block text-gray-700 text-sm font-bold mb-2">
                    Charging Station
                </label>
                <select
                    id="chargingStation"
                    name="chargingStation"
                    className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                    onChange={handleChange}
                    value={chargingStation}
                >
                    <option value="">Select a charging station</option>
                    {chargingStations.map((station) => (
                        <option key={station.id} value={station.id}>
                            {station.locationType} ({station.zipCode})
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
                    Feedback
                </label>
                <div className="flex items-center">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="feedback"
                            value="true"
                            checked={feedback === true}
                            onChange={handleChange}
                        />{" "}
                        Positive
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="feedback"
                            value="false"
                            checked={feedback === false}
                            onChange={handleChange}
                        />{" "}
                        Negative
                    </label>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="timeAgo" className="block text-gray-700 text-sm font-bold mb-2">
                    Time Ago
                </label>
                <input
                    id="timeAgo"
                    name="timeAgo"
                    type="number"
                    className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                    placeholder="Time Ago"
                    onChange={handleChange}
                    value={timeAgo}
                />
            </div>
        </div>
    );
}
