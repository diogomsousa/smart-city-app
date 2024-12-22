import React from 'react'

export default function BatteryForm({ battery, updateBattery }) {
    const { modelNumber, storageCapacity, stateOfCharge, minVoltage, status, longitude, latitude } = battery;

    const handleChangeBattery = (e) => {
        const { name, value } = e.target;
        updateBattery({
            ...battery,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelNumber">
                    Model Number
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Model Number"
                    name="modelNumber"
                    onChange={handleChangeBattery}
                    value={modelNumber}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storageCapacity">
                    Storage Capacity (kWh)
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Storage Capacity"
                    name="storageCapacity"
                    onChange={handleChangeBattery}
                    value={storageCapacity}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stateOfCharge">
                    State of Charge (%)
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="State of Charge"
                    name="stateOfCharge"
                    onChange={handleChangeBattery}
                    value={stateOfCharge}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minVoltage">
                    Min Voltage Supported (V)
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Min Voltage"
                    name="minVoltage"
                    onChange={handleChangeBattery}
                    value={minVoltage}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="status"
                    onChange={handleChangeBattery}
                    value={status}
                >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                    Latitude
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Latitude"
                    name="latitude"
                    onChange={handleChangeBattery}
                    value={latitude}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                    Longitude
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="longitude"
                    name="longitude"
                    onChange={handleChangeBattery}
                    value={longitude}
                />
            </div>

        </div>

    )
}
