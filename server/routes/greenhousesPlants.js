const { Router } = require('express');

const isLogged = require('../middleware/isLogged');
const greenhousesPlants = require('../services/db/greenhousePlants');

const router = Router();

//plants in a greenhouse
router.get('/api/greenhouses/:greenhouseId/plants', isLogged, async(req, res) => {
    const id = req.params.greenhouseId;
    const plants = await greenhousesPlants.getAllPlants(id);
    if(plants.length > 0){
        return res.status(200).json(plants);
    }
    else{
        res.status(404).json({
            code: 404,
            message: "No plants found"
        });
    }
});

router.post('/api/greenhouses/:greenhouseId/plants', isLogged, async (req, res) => {
    const greenhouseId = parseInt(req.params.greenhouseId);
    const plantId = parseInt(req.body.plant_id);
    const quantity = parseInt(req.body.quantity);
    const plant = await greenhousesPlants.addPlant(greenhouseId, plantId, quantity)
    if(plant){
        return res.status(201).json(plant);
    }
    else{
        res.status(500).json({
            code: 500,
            message: "Plant not added"
        });
    }
});

router.patch('/api/greenhouses/:greenhouseId/plants/:plantId', isLogged, async (req, res) => {
    const greenhouseId = req.params.greenhouseId;
    const plantId = req.params.plantId;
    const quantity = req.body.quantity;
    const plant = greenhousesPlants.patchPlant(greenhouseId, plantId, quantity);
    if(plant){
        return res.status(200).json(plant);
    }
    else{
        res.status(500).json({
            code: 500,
            message: "Plant not updated"
        });
    }

});

router.delete('/api/greenhouses/:greenhouseId/plants/:plantId', isLogged, async (req, res) => {
    const greenhouseId = req.params.greenhouseId;
    const plantId = req.params.plantId;
    if(await greenhousesPlants.deletePlant(greenhouseId, plantId) === true){
        return res.status(200).json({
            code: 200,
            message: "Plant deleted"
        });
    }
    else{
        res.status(500).json({
            code: 500,
            message: "Plant not deleted"
        });
    }
});

module.exports = router;