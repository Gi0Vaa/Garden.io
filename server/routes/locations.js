const { Router } = require('express');

const isLogged = require('../middleware/isLogged');
const locations = require('../services/db/locations');

const router = Router();

//locations
router.get('/api/locations', isLogged, async (req, res) => {
    const locs = await locations.getAllLocations();
    if(locs.length === 0){
        return res.status(404).json({
            code: 404,
            message: "No locations found"
        });
    }
    else{
        return res.status(200).json(locs);
    }
});

module.exports = router;