const pool = require('./pool');

async function getAllPlants(){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM plant');
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getPlant(id){
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT * FROM plant WHERE plant_id = ?', [id]);
        return row[0];
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getPlantByName(name){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM plant WHERE name LIKE '%${name}%'`);
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
    getAllPlants,
    getPlant,
    getPlantByName
};