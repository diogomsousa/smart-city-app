import axios from 'axios';

const API_URL = 'http://localhost:8888';

// Fetch vehicles
export const fetchVehicles = async () => {
    try {
        const response = await axios.get(`${API_URL}/vehicles`);
        return response.data;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
};

// Fetch charging stations
export const fetchChargingStations = async () => {
    try {
        const response = await axios.get(`${API_URL}/stations`);
        return response.data;
    } catch (error) {
        console.error("Error fetching charging stations:", error);
        throw error;
    }
};
