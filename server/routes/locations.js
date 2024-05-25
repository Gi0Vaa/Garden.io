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

//countries
router.get('/api/countries', isLogged, async (req, res) => {
    const countries = await locations.getCountries();
    if(countries.length === 0){
        return res.status(404).json({
            code: 404,
            message: "No countries found"
        });
    }
    else{
        return res.status(200).json(countries);
    }
});

//cities
router.get('/api/cities/:country', isLogged, async (req, res) => {
    const cities = await locations.getCities(req.params.country);
    if(cities.length === 0){
        return res.status(404).json({
            code: 404,
            message: "No cities found"
        });
    }
    else{
        return res.status(200).json(cities);
    }
});

module.exports = router;