import axios from 'axios';

const API_URL = 'http://localhost:8888';

// Charging Stations
export const fetchChargingStations = async () => {
    try {
        const response = await axios.get(`${API_URL}/stations`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching charging stations: ${error.message}`);
    }
};

export const postChargingStation = async (chargingStation) => {
    try {
        const response = await axios.post(`${API_URL}/charging_station`, chargingStation);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting charging station: ${error.message}`);
    }
};

export const deleteStation = async (id) => {
    try {
        await axios.delete(`${API_URL}/charging_station/${id}`);
    } catch (error) {
        throw new Error(`Error deleting charging stations with ID ${id}: ${error.message}`);
    }
};



// Fetch vehicles
export const fetchVehicles = async () => {
    try {
        const response = await axios.get(`${API_URL}/vehicles`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching vehicles: ${error.message}`);
    }
};

export const postVehicle = async (vehicle) => {
    try {
        const response = await axios.post(`${API_URL}/vehicle`, vehicle);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting vehicle: ${error.message}`);
    }
};

export const deleteVehicle = async (id) => {
    try {
        await axios.delete(`${API_URL}/vehicle/${id}`);
    } catch (error) {
        throw new Error(`Error deleting vehicle with ID ${id}: ${error.message}`);
    }
};



// Batteries
export const fetchBatteries = async () => {
    try {
        const response = await axios.get(`${API_URL}/batteries`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching batteries: ${error.message}`);
    }
}

export const postBattery = async (battery) => {
    try {
        const response = await axios.post(`${API_URL}/battery`, battery);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting battery: ${error.message}`);
    }
};

export const deleteBattery = async (id) => {
    try {
        await axios.delete(`${API_URL}/battery/${id}`);
    } catch (error) {
        throw new Error(`Error deleting battery with ID ${id}: ${error.message}`);
    }
};



// Solar Panels
export const fetchSolarPanels = async () => {
    try {
        const response = await axios.get(`${API_URL}/solarPanels`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching solar panels: ${error.message}`);
    }
}

export const postSolarPanel = async (solar_panel) => {
    try {
        const response = await axios.post(`${API_URL}/solarPanel`, solar_panel);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting solar panel: ${error.message}`);
    }
};

export const deleteSolarPanel = async (id) => {
    try {
        await axios.delete(`${API_URL}/solarPanel/${id}`);
    } catch (error) {
        throw new Error(`Error deleting solar panel with ID ${id}: ${error.message}`);
    }
};



// Experiences
export const fetchExperiences = async () => {
    try {
        const response = await axios.get(`${API_URL}/experiences`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching experiences: ${error.message}`);
    }
};

export const postExperience = async (experience) => {
    try {
        const response = await axios.post(`${API_URL}/experience`, experience);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting experience: ${error.message}`);
    }
};

export const deleteExperience = async (id) => {
    try {
        await axios.delete(`${API_URL}/experience/${id}`);
    } catch (error) {
        throw new Error(`Error deleting experience with ID ${id}: ${error.message}`);
    }
};




// Requests
export const fetchRequests = async () => {
    try {
        const response = await axios.get(`${API_URL}/requests`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching requests: ${error.message}`);
    }
};

export const postRequest = async (request) => {
    try {
        const response = await axios.post(`${API_URL}/request`, request);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting request: ${error.message}`);
    }
};

export const deleteRequest = async (id) => {
    try {
        await axios.delete(`${API_URL}/request/${id}`);
    } catch (error) {
        throw new Error(`Error deleting request with ID ${id}: ${error.message}`);
    }
};