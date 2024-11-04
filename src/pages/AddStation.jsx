import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddStation.css';

export default function AddStation() {


    const [station, setStation] = useState({
        brand: "",
        timeZone: "",
        city: ""
    })

    const { brand, timeZone, city } = station

    const onInputChange = (e) => {
        setStation({ ...station, [e.target.name]: e.target.value })
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

    return (
        <div>
            <div>
                <button
                    onClick={handleBackToHome}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button">
                    Back
                </button>
                {/* Additional content for adding a station can go here */}
            </div>

            <div className='form-container'>
                <div class="w-full max-w-xs">
                    <form onSubmit={(e) => onSubmit(e)} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="brand">
                                Brand
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type={"text"}
                                placeholder="Brand"
                                name='brand'
                                value={brand}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="timeZone">
                                TimeZone
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="TimeZone"
                                name='timeZone'
                                value={timeZone}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
                                City
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="City"
                                name='city'
                                value={city}
                                onChange={(e) => onInputChange(e)} />
                        </div>


                        <div class="flex items-center justify-between">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline button-add-form" type="submit">
                                Add Station
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
