const pool = require('./pool');
const crypto = require('crypto');
const { getUser } = require('./users');

async function register(user) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO api_user (email, password, salt, refreshToken, role) VALUES (?, ?, ?, ?, ?)', [user.email, user.password, user.salt, user.refreshToken, "user"]);
        return await getUser(user.email);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function login(email, password) {
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query(
            `SELECT * FROM api_user
            JOIN api_role ON api_user.role = api_role.name
            WHERE email = ?`, 
            [email]
        );
        if (row.length === 0) {
            return null;
        }
        const user = row[0];
        const pepper = process.env.PEPPER;
        const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
        const hashedPasswordPepper = crypto.pbkdf2Sync(hashedPassword, pepper, 1000, 64, 'sha512').toString('hex');
        if (hashedPasswordPepper === user.password) {
            return user;
        }
        return null;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function checkRefreshToken(email, refreshToken) {
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query(`
            SELECT * FROM api_user
            JOIN api_role ON api_user.role = api_role.name
            WHERE email = ? AND refreshToken = ?`,
            [email, refreshToken]
        );
        if (row.length === 0) {
            return null;
        }
        return row[0];
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function updateRefreshToken(email, refreshToken) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('UPDATE api_user SET refreshToken = ? WHERE email = ?', [refreshToken, email]);
        return await getUser(email);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

module.exports = {
    register,
    login,
    checkRefreshToken,
    updateRefreshToken
};