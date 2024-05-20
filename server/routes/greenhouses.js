const { Router } = require('express');

const isLogged = require('../middleware/isLogged');
const greenhouses = require('../services/db/greenhouses');

const router = Router();

//GREENHOUSE
router.get('/api/greenhouses', isLogged, async (req, res) => {
    const greenhouses = await greenhouses.getAllGreenhouses();
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

router.post('/api/greenhouses', isLogged, async(req, res) => {
    const data = req.body;
    
    const greenhouse = await greenhouses.createGreenhouse(data);
    if(greenhouse){
        return res.status(201).json(greenhouse);
    }
    else{
        return res.status(500).json({
            code: 500,
            message: "Greenhouse not created"
        });
    }
});

router.get('/api/greenhouses/:id', isLogged, async (req, res) => {
    const id = req.params.id;
    const greenhouse = await greenhouses.getGreenhouse(id);
    if(greenhouse){
        return res.status(200).json(greenhouse);
    }
    else{
        return res.status(404).json({
            code: 404,
            message: "Greenhouse not found"
        });
    }
});

router.put('/api/greenhouses/:id', isLogged, async(req, res) => {
    const id = req.params.id;
    const data = req.body;

    const greenhouse = greenhouses.updateGreenhouse(id, data);
    if(greenhouse){
        return res.status(200).json(greenhouse);
    }
    else{
        return res.status(500).json({
            code: 500,
            message: "Greenhouse not updated"
        });
    }
});

router.delete('/api/greenhouses/:id', isLogged, (req, res) => {
    const id = req.params.id;
    const deleted = greenhouses.deleteGreenhouse(id);
    if(deleted){
        return res.status(200).json({
            code: 200,
            message: "Greenhouse deleted"
        });
    }
    else{
        return res.status(500).json({
            code: 500,
            message: "Greenhouse not deleted"
        });
    }
});

module.exports = router;