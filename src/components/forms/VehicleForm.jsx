import React, { useState } from 'react';
import TimePicker from '../TimePicker';
import './VehicleForm.css';

export default function VehicleForm({ vehicle, updateVehicle }) {


    const { brand, model, portLocation, batteryCapacity, thermalSystem, connectorType, chargingBehavior, longitude, latitude } = vehicle;

    const handleChangeVehicle = (e) => {
        const { name, value } = e.target;
        updateVehicle({
            ...vehicle,
            [name]: value,
        });
    };

    return (

        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                    Brand
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Brand"
                    name="brand"
                    onChange={handleChangeVehicle}
                    value={brand}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                    Model
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Model"
                    name="model"
                    onChange={handleChangeVehicle}
                    value={model}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="portLocation">
                    Port Location
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Port Location"
                    name="portLocation"
                    onChange={handleChangeVehicle}
                    value={portLocation}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batteryCapacity">
                    Battery Capacity
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Battery Capacity"
                    name="batteryCapacity"
                    onChange={handleChangeVehicle}
                    value={batteryCapacity}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thermalSystem">
                    Thermal System
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Thermal System"
                    name="thermalSystem"
                    onChange={handleChangeVehicle}
                    value={thermalSystem}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="connectorType">
                    Connector Type
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Connector Type"
                    name="connectorType"
                    onChange={handleChangeVehicle}
                    value={connectorType}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chargingBehavior">
                    Charging Behavior
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Charging Behavior"
                    name="chargingBehavior"
                    onChange={handleChangeVehicle}
                    value={chargingBehavior}
                />
            </div>

            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="longitude">
                    Longitude
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Longitude"
                    name='longitude'
                    onChange={handleChangeVehicle}
                    value={longitude} />
            </div>

            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="latitude">
                    Latitude
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Latitude"
                    name='latitude'
                    onChange={handleChangeVehicle}
                    value={latitude} />
            </div>
        </div>

    )
}
