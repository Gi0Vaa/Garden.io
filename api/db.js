const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('api_garden.sqlite3');

//DDL
db.serialize(() => {
    //enable foreign keys
    db.run('PRAGMA foreign_keys = ON');

    //plant table
    db.run(`
        CREATE TABLE IF NOT EXISTS plant (
            plant_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        )
    `);

    //add plants
    db.run(`
        INSERT OR IGNORE INTO plant (plant_id, name, description) VALUES 
        (1, 'Rose', 'A symbol of love and beauty, the rose boasts a variety of colors and shapes. Its intoxicating scent and velvety petals make it a regal flower. It grows as a thorny shrub, giving us splendid blooms in spring and summer.'),
        (2, 'The Giant Tree Fern', 'Majestic Australian/NZ fern (Dicksonia antarctica) reaches 15m with impressive trunk and feathery leaves (up to 4m!). Thrives in shade and moisture, adding a prehistoric touch to landscapes. Symbolizes elegance, resilience, and tranquility.')
    `);

    //type table
    db.run(`
        CREATE TABLE IF NOT EXISTS api_role (
            role TEXT PRIMARY KEY,
            tokenExp TEXT NOT NULL
        )
    `);

    //types of users
    db.run(`
       INSERT OR IGNORE INTO api_role (role, tokenExp) VALUES 
        ('user', '1d'),
        ('partner', '4h'),
        ('admin', '1h')
   `);

    //user table
    db.run(`
        CREATE TABLE IF NOT EXISTS api_user (
            email TEXT PRIMARY KEY,
            password TEXT NOT NULL,
            salt TEXT NOT NULL,
            refreshToken TEXT,
            role TEXT,
            FOREIGN KEY (role) REFERENCES api_role(role) ON DELETE SET NULL
        )
    `);
});

module.exports = db;