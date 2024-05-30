import axios from 'axios';
import logout from '@utils/logout';

export const getUsersByName = async (name) => {
    return await axios.get(`/api/users/research/${name}`)
    .then(res => res.data)
    .catch(err => {
        if (err.response.status === 404) {
            return [];
        }
        else if(err.response.status === 401) {
            logout();
            return null;
        }
    });
}