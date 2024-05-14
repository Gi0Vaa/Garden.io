const { Router } = require('express');
const axios = require('axios');

const router = Router();

const isLogged = require('../middleware/isLogged');

const keys = require('../apiKeys.json')['api.greenhortus.life'];

//get di tutte le piante
router.get(`/api/plants`,  (req, res) => {
    return axios.get(`${process.env.GH_API_URL}/plants`, {
        headers: {
            'authorization': "Bearer " + keys['authorization']
        }
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(err => {
            if(err?.response?.status) {
                res.status(err.response.status).json(err);
            }
            else {
                res.status(500).json(err);
            }
        });
});

//get di una singola pianta
router.get('/api/plants/:id', isLogged, (req, res) => {
    const id = req.params.id;
    return axios.get(`${process.env.GH_API_URL}/plants/${id}`)
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

//ricerca di tutte le piante che contengono la stringa passata
router.get('/api/plants/research/:name', isLogged, (req, res) => {
    const name = req.params.name;
    return axios.get(`${process.env.GH_API_URL}/plants/research/${name}`)
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