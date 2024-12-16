import axios from 'axios';

const API_URL = 'http://localhost:8888';

// Fetch stations
export const fetchChargingStations = async () => {
    try {
        const response = await axios.get(`${API_URL}/stations`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stations:", error);
        throw error;
    }
};

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

// Fetch experiences
export const fetchExperiences = async () => {
    try {
        const response = await axios.get(`${API_URL}/experiences`);
        return response.data;
    } catch (error) {
        console.error("Error fetching experiences:", error);
        throw error;
    }
};

// Post a vehicle
export const postVehicle = async (vehicle) => {
    try {
        const response = await axios.post(`${API_URL}/vehicle`, vehicle);
        return response.data;
    } catch (error) {
        console.error("Error posting vehicle:", error);
        throw error;
    }
};

// Post a charging station
export const postChargingStation = async (chargingStation) => {
    try {
        const response = await axios.post(`${API_URL}/charging_station`, chargingStation);
        return response.data;
    } catch (error) {
        console.error("Error posting charging station:", error);
        throw error;
    }
};

// Delete a station
export const deleteStation = async (id) => {
    try {
        await axios.delete(`${API_URL}/charging_station/${id}`);
    } catch (error) {
        console.error(`Error deleting station with ID ${id}:`, error);
        throw error;
    }
};

// Delete a vehicle
export const deleteVehicle = async (id) => {
    try {
        await axios.delete(`${API_URL}/vehicle/${id}`);
    } catch (error) {
        console.error(`Error deleting vehicle with ID ${id}:`, error);
        throw error;
    }
};

// Delete an experience
export const deleteExperience = async (id) => {
    try {
        await axios.delete(`${API_URL}/experience/${id}`);
    } catch (error) {
        console.error(`Error deleting experience with ID ${id}:`, error);
        throw error;
    }
};
