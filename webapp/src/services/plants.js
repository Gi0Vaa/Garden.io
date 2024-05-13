import axios from 'axios';

export const getPlants = async () => {
    return await axios.get(`/api/plants`);
}

export const getPlantById = async (id) => {
    return await axios.get(`/api/plants/${id}`);
}

export const getPlantsByName = async (string) => {
    return await axios.get(`/api/plants/research/${string}`);
}