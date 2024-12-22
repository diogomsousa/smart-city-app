import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEntity.css';
import VehicleForm from '../components/forms/VehicleForm';
import ChargingStationForm from '../components/forms/ChargingStationForm';
import BatteryForm from '../components/forms/BatteryForm';
import SolarPanelForm from '../components/forms/SolarPanelForm';
import { postChargingStation, postVehicle, postBattery, postSolarPanel } from '../services/api';

export default function AddEntity() {

    const navigate = useNavigate();

    const [filter, setFilter] = useState('vehicle'); //Default as 'vehicle'

    const [chargingStation, setChargingStation] = useState({
        locationType: "",
        zipCode: "",
        city: "",
        chargingStandard: "",
        voltageSupported: 85,
        energyDelivered: 120,
        connectorType: "",
        paymentModel: "",
        longitude: 0,
        latitude: 0
    });

    const [vehicle, setVehicle] = useState({
        brand: "",
        model: "",
        portLocation: "",
        batteryCapacity: 20,
        thermalSystem: "",
        connectorType: "",
        chargingBehavior: "",
        longitude: 0,
        latitude: 0
    });

    const [solarPanel, setSolarPanel] = useState({
        modelNumber: "",
        generationCapacity: 0,
        minVoltage: 40,
        maxVoltage: 100,
        conversionEfficiency: 20,
        status: true,
        longitude: 0,
        latitude: 0
    });

    const [battery, setBattery] = useState({
        modelNumber: "",
        storageCapacity: 100,
        stateOfCharge: 40,
        minVoltage: 40,
        status: true,
        longitude: 0,
        latitude: 0
    });

    // Update functions for each entity
    const updateVehicle = (updatedVehicle) => setVehicle(updatedVehicle);
    const updateChargingStation = (updatedChargingStation) => setChargingStation(updatedChargingStation);
    const updateBattery = (updatedBattery) => setBattery(updatedBattery);
    const updateSolarPanel = (updatedSolarPanel) => setSolarPanel(updatedSolarPanel);

    const validateForm = (entity) => {
        switch (entity) {
            case 'vehicle':
                return vehicle.brand && vehicle.model && vehicle.portLocation && vehicle.connectorType && vehicle.thermalSystem && vehicle.chargingBehavior;
            case 'chargingStation':
                return chargingStation.locationType && chargingStation.zipCode && chargingStation.city && chargingStation.chargingStandard && chargingStation.voltageSupported && chargingStation.energyDelivered && chargingStation.connectorType && chargingStation.paymentModel && chargingStation.longitude && chargingStation.latitude;
            case 'battery':
                return battery.modelNumber && battery.storageCapacity && battery.stateOfCharge && battery.minVoltage && battery.status && battery.longitude && battery.latitude;
            case 'solarPanel':
                return solarPanel.modelNumber && solarPanel.generationCapacity && solarPanel.minVoltage && solarPanel.maxVoltage && solarPanel.conversionEfficiency && solarPanel.status && solarPanel.longitude && solarPanel.latitude;
            default:
                return false;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        //Check if form is valid
        if (!validateForm(filter)) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        try {
            switch (filter) {
                case 'vehicle':
                    await postVehicle(vehicle);
                    break;
                case 'chargingStation':
                    await postChargingStation(chargingStation);
                    break;
                case 'battery':
                    await postBattery(battery);
                    break;
                case 'solarPanel':
                    await postSolarPanel(solarPanel);
                    break;
                default:
                    alert("Cannot post data because Entity Type was not found!");
                    break;
            }
            navigate('/');
        } catch (error) {
            alert("There was an error submitting the form. Please try again.");
        }
    };

    const renderForm = () => {
        switch (filter) {
            case "vehicle":
                return <VehicleForm vehicle={vehicle} updateVehicle={updateVehicle} />;
            case "chargingStation":
                return <ChargingStationForm chargingStation={chargingStation} updateChargingStation={updateChargingStation} />;
            case "battery":
                return <BatteryForm battery={battery} updateBattery={updateBattery} />;
            case "solarPanel":
                return <SolarPanelForm solarPanel={solarPanel} updateSolarPanel={updateSolarPanel} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Back Button */}
            <div>
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button">
                    Back
                </button>
            </div>

            {/* Filters Section */}
            <div className="filters-section">
                <div className="add-entity-filters-container">
                    <div className="flex">
                        {["vehicle", "chargingStation", "battery", "solarPanel"].map((entity) => (
                            <div key={entity} className="flex items-center me-4">
                                <input
                                    type="radio"
                                    value={entity}
                                    name="inline-radio-group"
                                    checked={filter === entity}
                                    onChange={() => setFilter(entity)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {entity.charAt(0).toUpperCase() + entity.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <div className="w-full max-w-xs">
                        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-full">
                            {renderForm()}
                            <div className="button-container flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline button-add-form"
                                >
                                    Add {filter.charAt(0).toUpperCase() + filter.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}