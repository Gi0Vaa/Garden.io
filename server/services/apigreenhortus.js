const axios = require('axios');
require('dotenv').config();
const updateTokenFile = require('../utils/updateTokenFile');

const getPlants = async () => {
    const accessToken = require('../apiKeys.json')['apiGreenHortus'].accessToken;
    return await axios.get(`${process.env.GH_API_URL}/plants`, {
        headers: {
            'authorization': "Bearer " + accessToken
        }
    })
}

const getPlantById = async (id) => {
    const accessToken = require('../apiKeys.json')['apiGreenHortus'].accessToken;
    return await axios.get(`${process.env.GH_API_URL}/plants/${id}`, {
        headers: {
            'authorization': "Bearer " + accessToken
        }
    })
}

const getPlantsByName = async (name) => {
    const accessToken = require('../apiKeys.json')['apiGreenHortus'].accessToken;
    return await axios.get(`${process.env.GH_API_URL}/plants/research/${name}`, {
        headers: {
            'authorization': "Bearer " + accessToken
        }
    })
}

const refreshToken = async () => {
    const refreshToken = require('../apiKeys.json')['apiGreenHortus'].refreshToken
    return await axios.post(`${process.env.GH_API_URL}/auth/refresh`, {
        refreshToken: refreshToken
    });
}

module.exports = { getPlants, getPlantById, getPlantsByName, refreshToken };