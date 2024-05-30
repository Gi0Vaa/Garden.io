const { Router } = require('express');

const isLogged = require('../middleware/isLogged');
const weather = require('../services/db/weather');

const router = Router();

router.get('/api/weather/:location', isLogged, async (req, res) => {
    const location = req.params.location;
    const weatherData = await weather.getWeather(location);
    if(!weatherData){
        return res.status(404).json({
            code: 404,
            message: "No weather data found"
        });
    }
    else{
        return res.status(200).json(weatherData);
    }
});

module.exports = router;