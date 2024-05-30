const axios = require('axios');
const cron = require('node-cron');

const locations = require('../services/db/locations');
const key = require('../apiKeys.json').openWeather.apiKey;
const weather = require('../services/db/weather');

async function updateWeather() {
    const ls = await locations.getGreenhousesLocations();
    try {
        for (l of ls) {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${l.latitude}&lon=${l.longitude}&appid=${key}&units=metric`);
            const w = {
                location: l.locationId,
                temperature: res.data.main.temp,
                humidity: res.data.main.humidity,
                date: new Date()
            }
            await weather.createWeather(w);
        }
    }
    catch(err){
        console.log(err);
    }
    finally{
        console.log('Weather updated');
    }
}

//avvia il job allo start del server
updateWeather();

//aggiorna il meteo ogni ora
cron.schedule('0 * * * *', updateWeather, {
    scheduled: true,
    timezone: "Europe/Rome"
});


module.exports = {
    updateWeather
}