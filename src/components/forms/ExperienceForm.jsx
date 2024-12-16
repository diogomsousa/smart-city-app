import React, { useState, useEffect } from "react";

export default function ExperienceForm({
    experience,
    updateExperience,
    vehicles,
    chargingStations,
}) {
    const { vehicle, chargingStation, feedback, timeAgo } = experience;

    // State to track the currently selected vehicle's connector type
    const [selectedConnectorType, setSelectedConnectorType] = useState("");

    // Update connector type when a vehicle is selected
    useEffect(() => {
        if (vehicle) {
            // Find the vehicle in the vehicles array by matching the vehicle ID
            const selectedVehicle = vehicles.find((v) => v.id === vehicle);
            console.log("Selected Vehicle:", selectedVehicle); // Debugging the selected vehicle
            if (selectedVehicle) {
                setSelectedConnectorType(selectedVehicle.connectorType || "");
            }
        }
    }, [vehicle, vehicles]); // Ensure this runs whenever `vehicle` or `vehicles` changes

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the vehicle is changed, update the connector type filter
        if (name === "vehicle") {
            const selectedVehicle = vehicles.find((v) => v.id === value);
            console.log("Vehicle Changed: ", selectedVehicle); // Debugging the changed vehicle
            setSelectedConnectorType(selectedVehicle?.connectorType || ""); // Update the connector type
        }

        // Update the form state for other fields
        updateExperience({
            ...experience,
            [name]: name === "feedback" ? value === "true" : value, // Convert string "true"/"false" to boolean
        });
    };

    // Filter charging stations based on the selected vehicle's connector type
    const filteredChargingStations = selectedConnectorType
        ? chargingStations.filter(
            (station) => station.connectorType === selectedConnectorType
        )
        : chargingStations;

    console.log("Filtered Charging Stations:", filteredChargingStations); // Debugging filtered charging stations
    console.log("vehicle", vehicle); // Debugging the vehicle ID

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
                    value={vehicle || ""} // Ensure the vehicle prop is just the ID
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
                    {filteredChargingStations.length > 0 ? (
                        filteredChargingStations.map((station) => (
                            <option key={station.id} value={station.id}>
                                {station.locationType} ({station.zipCode})
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            No stations available with the selected connector type
                        </option>
                    )}
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
