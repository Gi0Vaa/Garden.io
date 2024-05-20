const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5
});

async function createDatabase() {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('CREATE DATABASE IF NOT EXISTS api_garden');
        console.log('Database created');
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) return conn.end();
    }
}

async function createTables() {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('USE api_garden');

        //plants db
        await conn.query(`
            CREATE TABLE IF NOT EXISTS plant (
                plant_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                minHumidity INT,
                maxHumidity INT,
                minTemperature TEXT,
                maxTemperature TEXT
            )
        `);

        //add two plants
        await conn.query(`
            INSERT IGNORE INTO plant (plant_id, name, description, minHumidity, maxHumidity, minTemperature, maxTemperature) VALUES
            (1, 'Cactus', 'A plant that can survive with little water', 10, 20, '10', '30'),
            (2, 'Basil', 'A plant used in cooking', 50, 70, '15', '25')
        `);

        //api role
        await conn.query(`
            CREATE TABLE IF NOT EXISTS api_role (
                name CHAR(32) PRIMARY KEY,
                tokenExp TEXT NOT NULL
            )
        `);

        //types of users
        await conn.query(`
            INSERT IGNORE INTO api_role (name, tokenExp) VALUES
            ('user', '1d'),
            ('partner', '4h'),
            ('admin', '1h')
        `);

        //users db
        await conn.query(`
            CREATE TABLE IF NOT EXISTS api_user (
                email VARCHAR(255) PRIMARY KEY,
                password TEXT NOT NULL,
                salt TEXT NOT NULL,
                refreshToken TEXT,
                role CHAR(32),
                FOREIGN KEY (role) REFERENCES api_role(name) ON DELETE SET NULL
            )
        `);

        console.log('Tables created');
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        if (conn) return conn.end();
    }
}
module.exports = { createDatabase, createTables };