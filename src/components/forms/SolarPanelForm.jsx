import React from 'react'

export default function SolarPanelForm({ solarPanel, updateSolarPanel }) {

    const { modelNumber, generationCapacity, minVoltage, maxVoltage, conversionEfficiency, status, latitude, longitude } = solarPanel;

    const handleChangeSolarPanel = (e) => {
        const { name, value } = e.target;
        updateSolarPanel({
            ...solarPanel,
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
                    onChange={handleChangeSolarPanel}
                    value={modelNumber}
                />

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="generationCapacity">
                        Generation Capacity (kWh)
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Generation Capacity"
                        name="generationCapacity"
                        onChange={handleChangeSolarPanel}
                        value={generationCapacity}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minVoltage">
                        Min Voltage (V)
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Min Voltage"
                        name="minVoltage"
                        onChange={handleChangeSolarPanel}
                        value={minVoltage}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxVoltage">
                        Max Voltage (V)
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Max Voltage"
                        name="maxVoltage"
                        onChange={handleChangeSolarPanel}
                        value={maxVoltage}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conversionEfficiency">
                        Conversion Efficiency (%)
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Conversion Efficiency"
                        name="conversionEfficiency"
                        onChange={handleChangeSolarPanel}
                        value={conversionEfficiency}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="status"
                        onChange={handleChangeSolarPanel}
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
                        onChange={handleChangeSolarPanel}
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
                        onChange={handleChangeSolarPanel}
                        value={longitude}
                    />
                </div>
            </div>

        </div>
    )
}
