import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExperienceForm from '../components/forms/ExperienceForm';
import axios from 'axios';



export default function Experience() {

    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate('/');
    };

    const [vehicles, setVehicles] = useState([]);
    const [chargingStations, setChargingStations] = useState([]);

    const [experience, setExperience] = useState({
        vehicle: "",
        chargingStation: "",
        feedback: "",
        timeAgo: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vehicleResponse = await axios.get("http://localhost:8888/vehicles");
                setVehicles(vehicleResponse.data);

                const stationResponse = await axios.get("http://localhost:8888/stations");
                setChargingStations(stationResponse.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const updateExperience = (updatedExperience) => {
        setExperience(updatedExperience);
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        const dataToPost = {
            vehicle: { id: experience.vehicle },
            chargingStation: { id: experience.chargingStation },
            feedback: experience.feedback,
            timeAgo: parseInt(experience.timeAgo, 10),
        };

        try {
            await axios.post("http://localhost:8888/experience", dataToPost);
            alert("Experience added successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error posting experience: ", error);
            alert("There was an error submitting the experience.");
        }
    };

    return (
        <div>
            <div>
                <button
                    onClick={handleBackToHome}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button">
                    Back
                </button>
            </div>

            <div className="form-section">
                <div className="form-container">
                    <div className="w-full max-w-xs">
                        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <ExperienceForm
                                experience={experience}
                                updateExperience={updateExperience}
                                vehicles={vehicles}
                                chargingStations={chargingStations}
                            />

                            <div className="button-container flex justify-center mt-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Submit Experience
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
