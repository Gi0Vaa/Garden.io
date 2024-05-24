const pool = require('./pool');

async function getAllGreenhouses(){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`
        SELECT * FROM greenhouse g
        JOIN measurement m ON g.id = m.greenhouse
        JOIN location l ON g.location = l.locationId
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

async function getGreenhouse(greenhouseId){
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query(`
        SELECT g.*, m.temperature, m.humidity, l.country, l.region FROM greenhouse g
        JOIN measurement m ON g.id = m.greenhouse
        LEFT JOIN location l ON g.location = l.locationId
        WHERE g.id = ?`, 
        [greenhouseId]
    );
        return row[0];
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function createGreenhouse(greenhouse){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO greenhouse (name, description, type, location) VALUES (?, ?, ?, ?)', [greenhouse.name, greenhouse.description, greenhouse.type, greenhouse.location]);
        const row = await conn.query('SELECT MAX(id) id FROM greenhouse');
        await conn.query('INSERT INTO measurement (greenhouse, temperature, humidity, date) VALUES (?, ?, ?, ?)', [row[0].id, 0, 0, new Date()]);
        await require('./greenhousesUsers').addGreenhouseUser(greenhouse.userId, row[0].id);
        return await getGreenhouse(row[0].id);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }

}

async function updateGreenhouse(greenhouseId, greenhouse){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('UPDATE greenhouse SET name = ?, description = ? WHERE id = ?', [greenhouse.name, greenhouse.description, greenhouseId]);
        return await getGreenhouse(greenhouseId);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function deleteGreenhouse(greenhouseId){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('DELETE FROM greenhouse WHERE id = ?', [greenhouseId]);
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
    getAllGreenhouses,
    getGreenhouse,
    createGreenhouse,
    updateGreenhouse,
    deleteGreenhouse
};

