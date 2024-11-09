import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEntity.css';
import TimePicker from '../components/TimePicker';

export default function AddEntity() {


    const [station, setStation] = useState({
        brand: "",
        city: ""
    })

    const { brand, timeZone, city } = station;

    const [chargeTime, setChargeTime] = useState({ hours: 6, minutes: 15 });

    const onInputChange = (e) => {
        setStation({ ...station, [e.target.name]: e.target.value })
    };

    const handleTimeChange = (hours, minutes) => {
        setChargeTime({ hours, minutes });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8888/charging_station", station);
        navigate('/');
    }

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    const [batteryCapacity, setBatteryCapacity] = useState(85);
    const updateBatteryCapacity = (e) => {
        setBatteryCapacity(e.target.value);
    }

    return (
        <div>
            <div>
                <button
                    onClick={handleBackToHome}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button">
                    Back
                </button>
            </div>

            {/*Filters*/}
            <div className="add-entity-filters-container">
                <a href="#" className="block w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 add-entity-filters">
                    <div class="flex">
                        <div class="flex items-center me-4">
                            <input
                                id="inline-radio"
                                type="radio"
                                value=""
                                name="inline-radio-group"
                                defaultChecked={true}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vehicle</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Charging Station</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home Station</label>
                        </div>
                    </div>
                </a>
            </div>


            {/* Vehicle Form */}
            <div className='form-container'>
                <div class="w-full max-w-xs">
                    <form onSubmit={(e) => onSubmit(e)} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {/* <div class="mb-4 col-span-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="brand">
                                Brand
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type={"text"}
                                placeholder="Brand"
                                name='brand'
                                value={brand}
                                onChange={(e) => onInputChange(e)} />
                        </div> */}
                        <div class="mb-4 ">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Brand
                            </label>
                            <select
                                class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
                                name="timePeriod"
                            >
                                <option value="abarth">Abarth</option>
                                <option value="audi">Audi</option>
                                <option value="year">Citroen</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Model
                            </label>
                            <select
                                class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
                                name="timePeriod"
                            >

                                <option value="500">500</option>
                                <option value="q4_etron">Q4 e-tron</option>
                                <option value="berlingo">Berlingo</option>

                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Port Location
                            </label>
                            <select
                                class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
                                name="timePeriod"
                            >
                                <option value="rightR">Right Rear</option>
                                <option value="leftR">Left Rear</option>
                                <option value="leftF">Left Front</option>
                                <option value="rightF">Right Front</option>
                                <option value="middleF">Middle Front</option>
                            </select>
                        </div>


                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Battery Capacity
                            </label>
                            <input
                                type="range"
                                id="batteryCapacity-range"
                                class="w-full accent-indigo-600 battery-capacity-container"
                                min="20"
                                max="150"
                                value={batteryCapacity}
                                onChange={updateBatteryCapacity} />
                            <div class="flex justify-between text-gray-500">
                                <span id="minBatCapacity">{batteryCapacity}kwh</span>
                                <span id="maxBatCapacity">150kwh</span>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Thermal Management System
                            </label>
                            <div class="flex">
                                <div class="flex items-center me-4 ">
                                    <input
                                        id="inline-radio"
                                        type="radio"
                                        value=""
                                        name="inline-radio-group"
                                        defaultChecked={true}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active Cooling</label>
                                </div>
                                <div class="flex items-center me-4 thermal-system-container">
                                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 thermal-system-text">Passive Cooling</label>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Charging Port Type
                            </label>
                            <select
                                class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
                                name="timePeriod"
                            >
                                <option value="week">Tesla Supercharger</option>
                                <option value="month">CHAdeMO</option>
                                <option value="year">CCS</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Charging Behavior
                            </label>
                            <select
                                class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
                                name="chargingBehavior">
                                <option value="shortUse">Frequent short trips</option>
                                <option value="longUse">Long-distance travel</option>
                                <option value="ocassionalUse">Ocassional use</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                Plug & Charge Supported
                            </label>
                            <div class="flex">
                                <div class="flex items-center me-4 ">
                                    <input
                                        id="inline-radio"
                                        type="radio"
                                        value=""
                                        name="inline-radio-group"
                                        defaultChecked={true}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div class="flex items-center me-4 thermal-system-container">
                                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 thermal-system-text">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <TimePicker onTimeChange={handleTimeChange} />
                        </div>

                        <div className="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="range">
                                Range
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Range"
                                name='range'
                                value={city}
                                onChange={(e) => onInputChange(e)} />
                        </div>

                        <div class="flex items-center justify-between">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline button-add-form" type="submit">
                                Add Vehicle
                            </button>
                        </div>


                    </form>
                </div>
            </div>

            {/* Charging Station Form */}

            {/* Home Station Form */}
        </div>

    );
}
