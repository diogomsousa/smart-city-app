import React, { useState, useEffect } from 'react';

export default function TimePicker({ onTimeChange }) {
    const [hours, setHours] = useState(6);
    const [minutes, setMinutes] = useState(15);

    // To avoid calling onTimeChange immediately after state change
    useEffect(() => {
        onTimeChange(hours, minutes);
    }, [hours, minutes, onTimeChange]); // Dependency array ensures it runs when hours or minutes change

    const handleIncrement = (type) => {
        if (type === 'hours') {
            setHours(prev => Math.min(23, prev + 1)); // Increment hours, max 23
        } else {
            setMinutes(prev => {
                const newMinutes = (prev + 1) % 60; // Increment minutes, max 59
                if (newMinutes === 0) {
                    setHours(prev => Math.min(23, hours + 1)); // Increment hours if minutes roll over
                }
                return newMinutes;
            });
        }
    };

    const handleDecrement = (type) => {
        if (type === 'hours') {
            setHours(prev => Math.max(0, prev - 1)); // Decrement hours, min 0
        } else {
            setMinutes(prev => {
                const newMinutes = (prev === 0 ? 59 : prev - 1); // Decrement minutes, min 0
                if (newMinutes === 59) {
                    setHours(prev => Math.max(0, hours - 1)); // Decrement hours if minutes roll over
                }
                return newMinutes;
            });
        }
    };

    return (
        <div className="mb-4 col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
                Charge Time (0→420 km)
            </label>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleDecrement('hours')}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    type="button" // Prevent form submission
                >
                    -
                </button>
                <input type="number" readOnly value={hours} className="w-16 px-2 py-1 border rounded text-center" />
                <button
                    onClick={() => handleIncrement('hours')}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    type="button" // Prevent form submission
                >
                    +
                </button>
                <span className="text-gray-700 font-semibold">h</span>

                <button
                    onClick={() => handleDecrement('minutes')}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    type="button" // Prevent form submission
                >
                    -
                </button>
                <input type="number" readOnly value={minutes} className="w-16 px-2 py-1 border rounded text-center" />
                <button
                    onClick={() => handleIncrement('minutes')}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    type="button" // Prevent form submission
                >
                    +
                </button>
                <span className="text-gray-700 font-semibold">m</span>
            </div>
        </div>
    );
}
