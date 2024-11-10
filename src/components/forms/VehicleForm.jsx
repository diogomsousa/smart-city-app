import React, { useState } from 'react';
import TimePicker from '../TimePicker';
import './VehicleForm.css';

export default function VehicleForm({ vehicle, updateVehicle }) {
    // const [station, setStation] = useState({
    //     range: ""
    // })

    // // const [vehicle, setVehicle] = useState({
    // //     range: ""
    // // })

    // // const { range } = vehicle;

    // const { range } = station;

    // const [chargeTime, setChargeTime] = useState({ hours: 6, minutes: 15 });

    // // const onInputChange = (e) => {
    // //     setStation({ ...station, [e.target.name]: e.target.value })
    // // };

    // const handleTimeChange = (hours, minutes) => {
    //     setChargeTime({ hours, minutes });
    // };

    // const [batteryCapacity, setBatteryCapacity] = useState(85);

    // const updateBatteryCapacity = (e) => {
    //     setBatteryCapacity(e.target.value);
    // }



    const { brand, model, portLocation, batteryCapacity, thermalSystem, connectorType, chargingBehavior } = vehicle;

    const handleChangeVehicle = (e) => {
        const { name, value } = e.target;
        setChargingStation((prevState) => ({
            ...prevState,
            [name]: value // This ensures that the specific field is updated
        }));
    };




    return (

        <div>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="locationType">
                    Brand
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Brand"
                    name='brand'
                    onChange={handleChangeVehicle}
                    value={brand} />
            </div>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="model">
                    Model
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Model"
                    name='model'
                    onChange={handleChangeVehicle}
                    value={model} />
            </div>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="portLocation">
                    Port Location
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Port Location"
                    name='portLocation'
                    onChange={handleChangeVehicle}
                    value={portLocation} />
            </div>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="batteryCapacity">
                    Battery Capacity
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Battery Capacity"
                    name='batteryCapacity'
                    onChange={handleChangeVehicle}
                    value={batteryCapacity} />
            </div>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="thermalSystem">
                    Thermal System
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Thermal System"
                    name='thermalSystem'
                    onChange={handleChangeVehicle}
                    value={thermalSystem} />
            </div>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="connectorType">
                    Connector Type
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Connector Type"
                    name='connectorType'
                    onChange={handleChangeVehicle}
                    value={connectorType} />
            </div>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="chargingBehavior">
                    Charging Behavior
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Charging Behavior"
                    name='chargingBehavior'
                    onChange={handleChangeVehicle}
                    value={chargingBehavior} />
            </div>
        </div>

        // <div>
        //     <div class="mb-4 ">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Brand
        //         </label>
        //         <select
        //             class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
        //             name="timePeriod"
        //         >
        //             <option value="abarth">Abarth</option>
        //             <option value="audi">Audi</option>
        //             <option value="year">Citroen</option>
        //         </select>
        //     </div>
        //     <div class="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Model
        //         </label>
        //         <select
        //             class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
        //             name="timePeriod"
        //         >
        //             <option value="500">500</option>
        //             <option value="q4_etron">Q4 e-tron</option>
        //             <option value="berlingo">Berlingo</option>
        //         </select>
        //     </div>
        //     <div class="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Port Location
        //         </label>
        //         <select
        //             class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
        //             name="timePeriod"
        //         >
        //             <option value="rightR">Right Rear</option>
        //             <option value="leftR">Left Rear</option>
        //             <option value="leftF">Left Front</option>
        //             <option value="rightF">Right Front</option>
        //             <option value="middleF">Middle Front</option>
        //         </select>
        //     </div>
        //     <div class="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Battery Capacity
        //         </label>
        //         <input
        //             type="range"
        //             id="batteryCapacity-range"
        //             class="w-full accent-indigo-600 battery-capacity-container"
        //             min="20"
        //             max="150"
        //             value={batteryCapacity}
        //             onChange={updateBatteryCapacity} />
        //         <div class="flex justify-between text-gray-500">
        //             <span id="minBatCapacity">{batteryCapacity}kwh</span>
        //             <span id="maxBatCapacity">150kwh</span>
        //         </div>
        //     </div>
        //     <div class="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Thermal Management System
        //         </label>
        //         <div class="flex">
        //             <div class="flex items-center me-4 ">
        //                 <input
        //                     id="inline-radio"
        //                     type="radio"
        //                     value=""
        //                     name="inline-radio-group"
        //                     defaultChecked={true}
        //                     class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        //                 <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active Cooling</label>
        //             </div>
        //             <div class="flex items-center me-4 thermal-system-container">
        //                 <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        //                 <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 thermal-system-text">Passive Cooling</label>
        //             </div>
        //         </div>
        //     </div>
        //     <div class="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Charging Port Type
        //         </label>
        //         <select
        //             class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
        //             name="timePeriod"
        //         >
        //             <option value="week">Tesla Supercharger</option>
        //             <option value="month">CHAdeMO</option>
        //             <option value="year">CCS</option>
        //         </select>
        //     </div>
        //     <div class="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Charging Behavior
        //         </label>
        //         <select
        //             class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
        //             name="chargingBehavior">
        //             <option value="shortUse">Frequent short trips</option>
        //             <option value="longUse">Long-distance travel</option>
        //             <option value="ocassionalUse">Ocassional use</option>
        //         </select>
        //     </div>
        //     <div class="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
        //             Plug & Charge Supported
        //         </label>
        //         <select
        //             class="shadow border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-75 focus:border-blue-600"
        //             name="chargingBehavior">
        //             <option value="yes">Yes</option>
        //             <option value="no">No</option>
        //         </select>
        //     </div>
        //     <div className="mb-4">
        //         <TimePicker onTimeChange={handleTimeChange} />
        //     </div>
        //     {/* <div className="mb-4">
        //         <label class="block text-gray-700 text-sm font-bold mb-2" for="range">
        //             Range
        //         </label>
        //         <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //             type="text"
        //             placeholder="Range"
        //             name='range'
        //             value={range}
        //             onChange={(e) => onInputChange(e)} />
        //     </div> */}
        // </div>
    )
}
