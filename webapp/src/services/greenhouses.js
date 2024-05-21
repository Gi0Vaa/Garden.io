import axios from 'axios';
import logout from '@utils/logout';

export const getGreenhouses = async (userId) => {
    return await axios.get(`/api/users/${userId}/greenhouses`)
    .then(res => res.data)
    .catch(err => {
        if (err.response.status === 404) {
            return [];
        }
        else if(err.response.status === 401) {
            logout();
            return [];
        }
    });

}

export const getGreenhouse = async (greenhouse_id) => {
    return await axios.get(`/api/greenhouses/${greenhouse_id}`)
    .then(res => res.data)
    .catch(err => {
        if (err.response.status === 404) {
            return null;
        }
        else if(err.response.status === 401) {
            logout();
            return null;
        }
    });
}

export const createGreenhouse = async (greenhouse) => {
    return await axios.post('/api/greenhouses', greenhouse)
    .then(res => res.data)
    .catch(err => {
        if(err.response.status === 401) {
            logout();
            return null;
        }
    });
}

export const updateGreenhouse = async (greenhouse_id, greenhouse) => {
    return await axios.put(`/api/greenhouses/${greenhouse_id}`, greenhouse)
    .then(res => res.data)
    .catch(err => {
        if(err.response.status === 401) {
            logout();
            return null;
        }
    });

}

export const deleteGreenhouse = async (greenhouse_id) => {
    return await axios.delete(`/api/greenhouses/${greenhouse_id}`)
    .then(res => res.data)
    .catch(err => {
        if(err.response.status === 401) {
            logout();
            return null;
        }
    });
}

export const getPlantsInGreenhouse = async (id) => {
    const plantsId = await axios.get(`/api/greenhouses/${id}/plants`);
    const plants = [];
    for (let plantId of plantsId.data) {
        const plantInfo = await (await axios.get(`/api/plants/${plantId.plant}`)).data;
        const plant = {
            ...plantInfo,
            quantity: plantId.quantity,
            greenhouse_id: id
        };
        plants.push(plant);
    }
    return plants;
}

export const addPlantInGreenhouse = async (greenhouse_id, plant_id, quantity) => {
    return await axios.post(`/api/greenhouses/${greenhouse_id}/plants`, {plant_id, quantity})
    .then(res => res.data)
    .catch(err => {
        if(err.response.status === 401) {
            logout();
            return null;
        }
    });
}

export const patchPlantInGreenhouse = async (greenhouse_id, plant_id, quantity) => {
    return await axios.patch(`/api/greenhouses/${greenhouse_id}/plants/${plant_id}`, {quantity})
    .then(res => res.data)
    .catch(err => {
        if(err.response.status === 401) {
            logout();
            return null;
        }
    });
}

export const deletePlantInGreenhouse = async (greenhouse_id, plant_id) => {
    return await axios.delete(`/api/greenhouses/${greenhouse_id}/plants/${plant_id}`)
    .then(res => res.data)
    .catch(err => {
        if(err.response.status === 401) {
            logout();
            return null;
        }
    });
}