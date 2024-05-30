const pool = require('./pool');

async function getWeather(location){
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query(`
            SELECT * FROM weather
            WHERE location = ?
            ORDER BY DATE DESC
            LIMIT 1`, 
            [location]
        );
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

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
    getWeather,
    createWeather
};