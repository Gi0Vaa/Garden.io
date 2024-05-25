const pool = require('./pool');

async function getAllLocations(){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM location`);
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getGreenhousesLocations(){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT DISTINCT l.* FROM location l
            JOIN greenhouse g ON l.locationId = g.location
        `);
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

//get all countries
async function getCountries(){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT DISTINCT country FROM location`);
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

//get all cities in a country
async function getCities(country){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT DISTINCT locationId, city FROM location WHERE country = ?`, [country]);
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

module.exports = {
    getAllLocations,
    getGreenhousesLocations,
    getCountries,
    getCities
};