import axios from 'axios';

export const getGreenhouses = async () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/greenhouses`);
}