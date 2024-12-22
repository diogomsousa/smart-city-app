import React from 'react';
import './LinkSidebar.css';

const LinkSidebar = ({ selectedLink, handleBackClick }) => {
    const renderSidebarContent = () => {
        if (selectedLink) {
            const { vehicle, station, experiences } = selectedLink; // Destructure vehicle, station, and experiences

            return (
                <div className="sidebar-content">
                    <br />
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">Link Information</h2>
                    <br />

                    <div className="flex gap-x-3">
                        <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                            <div className="relative z-10 size-7 flex justify-center items-center">
                                <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                            </div>
                        </div>

                        <div className="grow pt-0.5 pb-8">
                            {/* Vehicle Information */}
                            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                <strong>{vehicle ? `${vehicle.brand} ${vehicle.model}` : 'N/A'}</strong>
                            </h3>

                            {/* Station Information */}
                            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                <strong>{station ? `${station.zipCode} - ${station.locationType}` : 'N/A'}</strong>
                            </h3>

                            {/* experiences Section */}
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-800 dark:text-white">Experiences:</h4>
                                <ul className="list-disc pl-5 mt-2">
                                    {experiences && experiences.length > 0 ? (
                                        experiences.map((experience, index) => (
                                            <li key={index} className={experience.feedback ? 'text-green-600' : 'text-red-600'}>
                                                <strong>{experience.feedback ? 'Positive' : 'Negative'}</strong> {experience.comment}
                                                <span className="text-sm text-gray-500">
                                                    {new Date(experience.createdDate).toLocaleString()}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No experience available.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div className="no-link-selected">Select a link to view details</div>;
        }
    };

    return (
        <div>
            <div className="link-sidebar">
                {/* Back Button */}
                <button
                    onClick={handleBackClick}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                    Back
                </button>
                {renderSidebarContent()}
            </div>
        </div>
    );
};

export default LinkSidebar;
