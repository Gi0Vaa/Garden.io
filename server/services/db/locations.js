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

module.exports = {
    getAllLocations,
    getGreenhousesLocations
};