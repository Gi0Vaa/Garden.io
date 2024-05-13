import axios from 'axios';

export const getGreenhouses = async () => {
    return axios.get(`/api/users/nicolo.spampa@gmail.com/greenhouses`);
}