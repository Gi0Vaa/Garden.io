import axios from 'axios';

export const getGreenhouses = async (email) => {
    return await axios.get(`/api/users/${email}/greenhouses`);
}

export const getGreenhouse = async (greenhouse_id) => {
    return await axios.get(`/api/greenhouses/${greenhouse_id}`);
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
    const plantsId = await axios.get(`/api/greenhouses/${greenhouse_id}/plants`);
    const plants = [];
    for (let plantId of plantsId.data) {
        const plantInfo = await (await axios.get(`/api/plants/${plantId.plant_id}`)).data;
        const plant = {
            ...plantInfo,
            quantity: plantId.quantity,
            greenhouse_id: greenhouse_id
        };
        plants.push(plant);
    }
    return plants;
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