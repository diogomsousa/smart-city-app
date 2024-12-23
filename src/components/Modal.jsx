import React from 'react';
import './Modal.css'; // Your CSS for styling
import RequestForm from './forms/RequestForm'; // Import the RequestForm
import { postRequest } from '../services/api';

const Modal = ({ isOpen, closeModal, onSubmit, vehicles, batteries, request, updateRequest }) => {
    if (!isOpen) return null; // Don't render modal if it's not open

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestToPost = {
            vehicle: request.vehicle ? { id: request.vehicle } : null, // Wrap in object if present
            battery: request.battery ? { id: request.battery } : null,
            distance: request.distance || 0, // Ensure distance is always provided
            requestType: request.requestType || "", // Default to empty string if undefined
        };

        console.log("Payload being sent:", requestToPost);

        try {
            await postRequest(requestToPost);
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("There was an error submitting the request. Please try again.");
        }

        onSubmit();
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    {/* Request Form Content */}
                    <RequestForm
                        vehicles={vehicles}
                        batteries={batteries}
                        request={request}
                        updateRequest={updateRequest}
                    />

                    {/* Flex container for buttons */}
                    <div className="modal-buttons flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="cancel-modal bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-modal bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;