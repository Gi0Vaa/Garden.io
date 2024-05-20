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
        await conn.query('CREATE DATABASE IF NOT EXISTS greenhortus');
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
        await conn.query('USE greenhortus');

        //types of users table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS type (
                name CHAR(32) PRIMARY KEY,
                sessionExp INT NOT NULL
            )
        `);

        //admin and user
        await conn.query(`
            INSERT IGNORE INTO type (name, sessionExp) VALUES
            ('user', 3600),
            ('admin', 3600)
        `);

        //users table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS user (
                id CHAR(32) PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255) NOT NULL,
                pfp VARCHAR(255),
                type CHAR(32) NOT NULL,
                CONSTRAINT fk_type FOREIGN KEY (type) REFERENCES type(name)
            )
        `);

        //greenhouses table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS greenhouse (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                type CHAR(32) DEFAULT 'greenhouse'
            )
        `);

        //measurements table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS measurement (
                measureId INT AUTO_INCREMENT PRIMARY KEY,
                greenhouse INT NOT NULL,
                temperature TEXT NOT NULL,
                humidity TEXT NOT NULL,
                date DATETIME NOT NULL,
                CONSTRAINT fk_greenhouse_measurement FOREIGN KEY (greenhouse) REFERENCES greenhouse(id)
            )
        `);

        //greenhouses_users table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS greenhouse_user (
                greenhouse INT NOT NULL,
                user CHAR(32) NOT NULL,
                role CHAR(32) DEFAULT 'owner',
                CONSTRAINT fk_greenhouse FOREIGN KEY (greenhouse) REFERENCES greenhouse(id),
                CONSTRAINT fk_user FOREIGN KEY (user) REFERENCES user(id)
            )
        `);

        //plant_greenhouses table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS plant_greenhouse (
                plant INT NOT NULL,
                greenhouse INT NOT NULL,
                quantity INT NOT NULL,
                CONSTRAINT fk_plants FOREIGN KEY (greenhouse) REFERENCES greenhouse(id)
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