import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEntity.css';
import VehicleForm from '../components/forms/VehicleForm';
import ChargingStationForm from '../components/forms/ChargingStationForm';

export default function AddEntity() {

    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate('/');
    };

    const [filter, setFilter] = useState('vehicle');

    const [chargingStation, setChargingStation] = useState({
        locationType: "",
        zipCode: "",
        city: "",
        chargingStandard: "",
        voltageSupported: 85,
        energyDelivered: 120,
        connectorType: "",
        paymentModel: ""
    });

    const [vehicle, setVehicle] = useState({
        brand: "",
        model: "",
        portLocation: "",
        batteryCapacity: 20,
        thermalSystem: "",
        connectorType: "",
        chargingBehavior: "",
        plugCharge: false
    });

    const [refrigerator, setRefrigerator] = useState({
        brand: "",
        model: "",
        powerConsumption: 200,
        energyRating: "",
        dimensions: "",
        temperatureRange: ""
    });

    const [solarPanel, setSolarPanel] = useState({
        panelType: "",
        capacity: 300,
        efficiency: 18,
        dimensions: "",
        manufacturer: ""
    });

    const [battery, setBattery] = useState({
        brand: "",
        model: "",
        capacity: 5000,
        voltage: 48,
        technology: "Lithium-Ion",
        chargeCycles: 1000
    });




    const updateVehicle = (updatedVehicle) => setVehicle(updatedVehicle);
    const updateChargingStation = (updatedChargingStation) => setChargingStation(updatedChargingStation);
    const updateRefrigerator = (updatedRefrigerator) => setRefrigerator(updatedRefrigerator);
    const updateSolarPanel = (updatedSolarPanel) => setSolarPanel(updatedSolarPanel);
    const updateBattery = (updatedBattery) => setBattery(updatedBattery);



    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            switch (filter) {
                case 'vehicle':
                    await axios.post("http://localhost:8888/vehicle", vehicle);
                    break;
                case 'chargingStation':
                    await axios.post("http://localhost:8888/charging_station", chargingStation);
                    break;
                case 'refrigerator':
                    await axios.post("http://localhost:8888/refrigerator", refrigerator);
                    break;
                case 'solarPanel':
                    await axios.post("http://localhost:8888/solar_panel", solarPanel);
                    break;
                case 'battery':
                    await axios.post("http://localhost:8888/battery", battery);
                    break;
                default:
                    alert("Invalid entity type!");
                    return;
            }
            handleBackToHome();
        } catch (error) {
            console.error("Error posting data: ", error);
            alert("There was an error submitting the form. Please try again.");
        }
    };


    return (
        <div>
            {/* Back Button */}
            <div>
                <button
                    onClick={handleBackToHome}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button">
                    Back
                </button>
            </div>

            {/* Filters Section */}
            <div className="filters-section">
                <div className="add-entity-filters-container">
                    <a href="#" className="block w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 add-entity-filters">
                        <div className="flex">
                            <div className="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value="vehicle"
                                    name="inline-radio-group"
                                    defaultChecked={true}
                                    checked={filter === true}
                                    onChange={() => setFilter(true)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vehicle</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input
                                    id="inline-2-radio"
                                    type="radio"
                                    value="chargingstation"
                                    name="inline-radio-group"
                                    checked={filter === false}
                                    onChange={() => setFilter(false)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Charging Station</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value="vehicle"
                                    name="inline-radio-group"
                                    checked={filter === false}
                                    onChange={() => setFilter(false)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Refrigerator</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value="vehicle"
                                    name="inline-radio-group"
                                    checked={filter === false}
                                    onChange={() => setFilter(false)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Solar Panel</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value="vehicle"
                                    name="inline-radio-group"
                                    checked={filter === false}
                                    onChange={() => setFilter(false)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Battery</label>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <div className="w-full max-w-xs">
                        <form onSubmit={(e) => onSubmit(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-full">
                            {filter ? (
                                <div className="vehicle-form-container flex-1">
                                    <VehicleForm vehicle={vehicle} updateVehicle={updateVehicle} />
                                </div>
                            ) : (
                                <div className='charging-form-container flex-1'>
                                    <ChargingStationForm chargingStation={chargingStation} updateChargingStation={updateChargingStation} />
                                </div>
                            )}


                            <div className="button-container flex justify-center mt-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline button-add-form"
                                    type="submit"
                                >
                                    Add {filter ? 'Vehicle' : 'Charging Station'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}