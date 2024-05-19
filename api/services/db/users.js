const pool = require('./pool');

async function getAllUsers(){
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM api_user');
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getUser(email) {
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT * FROM api_user WHERE email = ?', [email]);
        return row[0];
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function createUser(user) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO api_user (email, password, salt, refreshToken, role) VALUES (?, ?, ?, ?, ?)', [user.email, user.password, user.salt, user.refreshToken, user.role]);
        return await getUser(user.email);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function updateUser(user) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('UPDATE api_user SET password = ?, salt = ?, refreshToken = ?, role = ? WHERE email = ?', [user.password, user.salt, user.refreshToken, user.role, user.email]);
        return await getUser(user.email);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser
};