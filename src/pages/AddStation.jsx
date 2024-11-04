import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddStation.css';

export default function AddStation() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div>
            <button
                onClick={handleBackToHome}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l back-default-button">
                Back
            </button>
            {/* Additional content for adding a station can go here */}
        </div>
    );
}
