const pool = require('./pool');

async function getAllGreenhouses(userId){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT * FROM greenhouse_user g
            JOIN greenhouse u ON g.greenhouse = u.id
            WHERE user = ?`, 
            [userId]
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

async function getGreenhouseUser(userId, greenhouseId){
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query(`
            SELECT * FROM greenhouse_user g
            JOIN greenhouse u ON g.greenhouse = u.id
            WHERE user = ? AND greenhouse = ?`, 
            [userId, greenhouseId]
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

async function addGreenhouseUser(userId, greenhouseId){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO greenhouse_user (user, greenhouse) VALUES (?, ?)', [userId, greenhouseId]);
        return await getGreenhouseUser(userId, greenhouseId);
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
    getGreenhouseUser,
    addGreenhouseUser
};