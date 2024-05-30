const pool = require('./pool');

async function getUser(email){
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
        return row[0];
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getUsersByName(name){
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT * FROM user WHERE email LIKE ? OR name LIKE ? OR surname LIKE ?', [name, name, name]);
        return row[0];
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function createUser(id, email, name, surname, pfp, type){
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO user (id, email, name, surname, pfp, type) VALUES (?, ?, ?, ?, ?, ?)', [id, email, name, surname, pfp, type]);
        return await getUser(email);
    }
    catch (err) {
        throw err;
        return false;
    }
    finally {
        if (conn) conn.end();
    }
}

module.exports = {
    getUser,
    getUsersByName,
    createUser
};