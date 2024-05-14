const { Router, response } = require('express');

const router = Router();

const isLogged = require('../middleware/isLogged');
const apiGreenHortus = require('../services/apigreenhortus');

const updateTokenFile = require('../utils/updateTokenFile');

//get di tutte le piante
router.get(`/api/plants`, isLogged, (req, res) => {
    apiGreenHortus.getPlants()
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(async (err) => {
            const code = err.response.status;
            if (code === 401) {
                apiGreenHortus.refreshToken()
                    .then(response => {
                        updateTokenFile('apiGreenHortus', response.data);
                    })
                    .then(() => {
                        apiGreenHortus.getPlants()
                            .then(response => {
                                res.status(200).json(response.data);
                            })
                            .catch(err => {
                                res.status(err.response.status).json(err.response.data);
                            })
                    })
                    .catch(err => {
                        res.status(err.response.status).json(err.response.data);
                    });
            }
            else {
                res.status(code).json(err.response.data);
            }
        })
});

//get di una singola pianta
router.get('/api/plants/:id', isLogged, (req, res) => {
    const id = req.params.id;
    apiGreenHortus.getPlantById(id)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(async (err) => {
            const code = err.response.status;
            if (code === 401) {
                apiGreenHortus.refreshToken()
                    .then(response => {
                        updateTokenFile('apiGreenHortus', response.data);
                    })
                    .then(() => {
                        apiGreenHortus.getPlants()
                            .then(response => {
                                res.status(200).json(response.data);
                            })
                            .catch(err => {
                                res.status(err.response.status).json(err.response.data);
                            })
                    })
                    .catch(err => {
                        res.status(err.response.status).json(err.response.data);
                    });
            }
            else {
                res.status(code).json(err.response.data);
            }
        })
});

//ricerca di tutte le piante che contengono la stringa passata
router.get('/api/plants/research/:name', isLogged, (req, res) => {
    const name = req.params.name;
    apiGreenHortus.getPlantsByName(name)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(async (err) => {
            const code = err.response.status;
            if (code === 401) {
                apiGreenHortus.refreshToken()
                    .then(response => {
                        updateTokenFile('apiGreenHortus', response.data);
                    })
                    .then(() => {
                        apiGreenHortus.getPlants()
                            .then(response => {
                                res.status(200).json(response.data);
                            })
                            .catch(err => {
                                res.status(err.response.status).json(err.response.data);
                            })
                    })
                    .catch(err => {
                        res.status(err.response.status).json(err.response.data);
                    });
            }
            else {
                res.status(code).json(err.response.data);
            }
        })
});

module.exports = router;