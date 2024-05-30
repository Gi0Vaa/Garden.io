import axios from 'axios';
import logout from '@utils/logout';

export const getWeather = async (location) => {
    return await axios.get(`/api/weather/${location}`)
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
};