const { Router } = require('express');

const isLogged = require('../middleware/isLogged');
const greenhousesUsers = require('../services/db/greenhousesUsers');

const router = Router();

//greenhouse of a user
router.get('/api/users/:user/greenhouses', isLogged, async (req, res) => { 
    const userId = req.params.user;
    const greenhouses = await greenhousesUsers.getAllGreenhouses(userId);
    if(greenhouses.length === 0){
        return res.status(404).json({
            code: 404,
            message: "No greenhouses found"
        });
    }
    else{
        return res.status(200).json(greenhouses);
    }
});

//add a greenhouse to a user
router.post('/api/users/greenhouses', isLogged, async (req, res) => {
    const data = req.body;
    const greenhouse = await greenhousesUsers.addGreenhouseUser(data.user, data.greenhouse);
    if(greenhouse){
        return res.status(200).json(greenhouse);
    }
    else{
        return res.status(500).json({
            code: 500,
            message: "Greenhouse not added"
        });
    }
});


module.exports = router;