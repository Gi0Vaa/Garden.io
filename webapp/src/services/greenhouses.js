import axios from 'axios';

export const getGreenhouses = async (email) => {
    return await axios.get(`/api/users/${email}/greenhouses`);
}

export const createGreenhouse = async (greenhouse) => {
    return await axios.post('/api/greenhouses', greenhouse);
}

export const updateGreenhouse = async (greenhouse_id, greenhouse) => {
    return await axios.put(`/api/greenhouses/${greenhouse_id}`, greenhouse);
}

export const deleteGreenhouse = async (greenhouse_id) => {
    return await axios.delete(`/api/greenhouses/${greenhouse_id}`);
}

export const getPlantsInGreenhouse = async (greenhouse_id) => {
    return await axios.get(`/api/greenhouses/${greenhouse_id}/plants`);
}

export const addPlantInGreenhouse = async (greenhouse_id, plant_id, quantity) => {
    return await axios.post(`/api/greenhouses/${greenhouse_id}/plants`, {plant_id, quantity});
}

export const patchPlantInGreenhouse = async (greenhouse_id, plant_id, quantity) => {
    return await axios.patch(`/api/greenhouses/${greenhouse_id}/plants/${plant_id}`, {quantity});
}

export const deletePlantInGreenhouse = async (greenhouse_id, plant_id) => {
    return await axios.delete(`/api/greenhouses/${greenhouse_id}/plants/${plant_id}`);
}