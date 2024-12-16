import React from 'react';
import './LinkSidebar.css';

const LinkSidebar = ({ selectedLink, handleBackClick }) => {
    const renderSidebarContent = () => {
        if (selectedLink) {
            const { vehicle, station } = selectedLink; // Destructure vehicle and station from selectedLink

            return (
                <div className="sidebar-content">
                    <div>
                        <br></br>
                        <h2>Link Information</h2>
                        <br></br>
                        <div class="flex gap-x-3">
                            {/* <div class="w-16 text-end">
                                <span class="text-xs text-gray-500 dark:text-neutral-400">12:05PM</span>
                            </div> */}
                            <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                <div class="relative z-10 size-7 flex justify-center items-center">
                                    <div class="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                                </div>
                            </div>
                            <div class="grow pt-0.5 pb-8">
                                <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                    <strong> {vehicle ? vehicle.brand : 'N/A'} {vehicle ? vehicle.model : 'N/A'}</strong>
                                </h3>
                                <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                    <strong> {station ? station.zipCode : 'N/A'} {station ? station.locationType : 'N/A'}</strong>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                    <strong>Feedback:</strong> {vehicle ? vehicle.model : 'N/A'}
                                </p>
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
                <button onClick={handleBackClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    Back
                </button>
                {renderSidebarContent()}
            </div>
        </div>


    );
};

export default LinkSidebar;
