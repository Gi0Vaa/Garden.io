const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();

const router = Router();

router.get(`/api/greenhouses`, (req, res) => {
    return axios.get(`${process.env.GH_API_URL}/greenhouses`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(err => {
            if(err?.response?.data?.code) {
                res.status(err.response.data.code).json(err);
            }
            else {
                res.status(500).json(err);
            }
        });
});

module.exports = router;