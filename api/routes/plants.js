const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

const plants = require('../services/db/plants');

const router = Router();

//get di tutte le piante
router.get('/v1/plants', isAuthenticated(["user", "partner", "admin"]), async (req, res) => {
    const allPlants = await plants.getAllPlants();
    if(allPlants.length > 0){
        res.status(200).json(allPlants);
    }
    else{
        res.status(404).json({
            code: 404,
            message: "No plants found"
        });
    }
});

//get di una singola pianta
router.get('/v1/plants/:id', isAuthenticated(["user", "partner", "admin"]), async (req, res) => {
    const id = req.params.id;
    const plant = await plants.getPlant(id);
    if(plant){
        res.status(200).json(plant);
    }
    else{
        res.status(404).json({
            code: 404,
            message: "Plant not found"
        });
    }
});

//ricerca di tutte le piante che contengono la stringa passata
router.get('/v1/plants/research/:name', isAuthenticated(["user", "partner", "admin"]), async (req, res) => {
    const name = req.params.name;
    const plantsFound = await plants.getPlantByName(name);
    if(plantsFound.length > 0){
        res.status(200).json(plantsFound);
    }
    else{
        res.status(404).json({
            code: 404,
            message: "No plants found"
        });
    }
})

/*
router.post('/v1/plants', isAuthenticated(["partner", "admin"]), (req, res) => {
    console.log(req.body);
    res.send('ok');
});

router.put('/v1/plants/:id', isAuthenticated(["partner", "admin"]), (req, res) => {
    const id = req.params.id;
    const plant = req.body;

    db.run('UPDATE plant SET name = ?, description = ? WHERE plant_id = ?', [plant.name, plant.description, id], (err) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        db.get('SELECT * FROM plant WHERE plant_id = ?', [id], (err, row) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            else {
                res.status(200).json(row);
            }
        });
    });
});

router.delete('/v1/plants/:id', isAuthenticated(["partner", "admin"]), (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM plant WHERE plant_id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else {
            res.status(200).json({
                code: 200,
                message: "Deleted"
            });
        }
    });
});
*/

module.exports = router;