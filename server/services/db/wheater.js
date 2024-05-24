const pool = require('./pool');

async function createWeather(weather){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO weather (location, temperature, humidity, date) VALUES (?, ?, ?, ?)', [weather.location, weather.temperature, weather.humidity, weather.date]);
        return true;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

module.exports = {
    createWeather
};