import axios from 'axios';
import logout from '@utils/logout';

export const getLocations = async () => {
    return await axios.get('/api/locations')
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
};