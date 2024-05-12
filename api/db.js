const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('garden.sqlite3');

//DDL
db.serialize(() => {
    //enable foreign keys
    db.run('PRAGMA foreign_keys = ON');

    //greenhouse table
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_greenhouse (
            greenhouse_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            temperature TEXT DEFAULT '0',
            humidity INTEGER DEFAULT 0
        )
    `);

    //plant table
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_plant (
            plant_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        )
    `);

    //add plants
    db.run(`
        INSERT OR IGNORE INTO garden_plant (plant_id, name, description) VALUES 
        (1, 'Rose', 'A symbol of love and beauty, the rose boasts a variety of colors and shapes. Its intoxicating scent and velvety petals make it a regal flower. It grows as a thorny shrub, giving us splendid blooms in spring and summer.'),
        (2, 'The Giant Tree Fern', 'Majestic Australian/NZ fern (Dicksonia antarctica) reaches 15m with impressive trunk and feathery leaves (up to 4m!). Thrives in shade and moisture, adding a prehistoric touch to landscapes. Symbolizes elegance, resilience, and tranquility.')
    `);

    //type table
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_role (
            role TEXT PRIMARY KEY,
            session_time INTEGER NOT NULL --in milliseconds
        )
    `);

    //types of users
    db.run(`
       INSERT OR IGNORE INTO garden_role (role, session_time) VALUES 
        ('user', 60000),
        ('admin', 60000)
   `);

    //user table
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_user (
            email TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            role TEXT,
            FOREIGN KEY (role) REFERENCES garden_role(role) ON DELETE SET NULL
        )
    `);

    //plants in a greenhouse
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_plant_greenhouse (
            greenhouse_id INTEGER NOT NULL,
            plant_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            PRIMARY KEY (greenhouse_id, plant_id),
            FOREIGN KEY (greenhouse_id) REFERENCES garden_greenhouse(greenhouse_id) ON DELETE CASCADE,
            FOREIGN KEY (plant_id) REFERENCES garden_plant(plant_id) ON DELETE CASCADE
        )
    `);

    //user in a greenhouse
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_user_greenhouse (
            greenhouse_id INTEGER NOT NULL,
            email TEXT NOT NULL,
            PRIMARY KEY (greenhouse_id, email),
            FOREIGN KEY (greenhouse_id) REFERENCES garden_greenhouse(greenhouse_id) ON DELETE CASCADE,
            FOREIGN KEY (email) REFERENCES garden_user(email) ON DELETE CASCADE
        )
    `);
})

module.exports = db;