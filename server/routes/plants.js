const { Router } = require('express');
const axios = require('axios');
const passport = require('passport');
require('express-session');
require('./auth/passport');

const router = Router();

const isLogged = require('../middleware/isLogged');

router.get(`/api/plants`, isLogged, (req, res) => {
    return axios.get(`${process.env.GH_API_URL}/plants`)
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