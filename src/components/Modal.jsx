import React from 'react';
import './Modal.css'; // Your CSS for styling
import RequestForm from './forms/RequestForm'; // Import the RequestForm

const Modal = ({ isOpen, closeModal, onSubmit, request, vehicles, updateRequest }) => {
    if (!isOpen) return null; // Don't render modal if it's not open

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(); // Call the provided submit handler
        closeModal(); // Close the modal after submit
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    {/* Request Form Content */}
                    <RequestForm
                        request={request}
                        vehicles={vehicles}
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
