import axios from 'axios';
import logout from '@utils/logout';

export const getPlants = async () => {
    return await axios.get(`/api/plants`)
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

export const getPlantById = async (id) => {
    return await axios.get(`/api/plants/${id}`)
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

export const getPlantsByName = async (string) => {
    return await axios.get(`/api/plants/research/${string}`)
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