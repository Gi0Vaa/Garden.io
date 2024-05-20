const pool = require('./pool');

async function getAllPlants(greenhouseId){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM plant_greenhouse WHERE greenhouse = ?', [greenhouseId]);
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getPlant(greenhouseId, plantId){
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT * FROM plant_greenhouse WHERE greenhouse = ? AND plant = ?', [greenhouseId, plantId]);
        return row[0];
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }

}

async function addPlant(greenhouseId, plantId, quantity){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO plant_greenhouse (plant, greenhouse, quantity) VALUES (?, ?, ?)', [plantId, greenhouseId, quantity]);
        return await getPlant(greenhouseId, plantId);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function patchPlant(greenhouseId, plantId, quantity){
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await getPlant(greenhouseId, plantId);
        const newQuantity = row.quantity + quantity;
        await conn.query('UPDATE plant_greenhouse SET quantity = ? WHERE greenhouse = ? AND plant = ?', [newQuantity, greenhouseId, plantId]);
        return await getPlant(greenhouseId, plantId);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function deletePlant(greenhouseId, plantId){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('DELETE FROM plant_greenhouse WHERE greenhouse = ? AND plant = ?', [greenhouseId, plantId]);
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
    getAllPlants,
    addPlant,
    patchPlant,
    deletePlant
};