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
        CREATE TABLE IF NOT EXISTS garden_user_type (
            type TEXT PRIMARY KEY,
            session_time INTEGER NOT NULL --in milliseconds
        )
    `);

    //types of users
    db.run(`
       INSERT OR IGNORE INTO garden_user_type (type, session_time) VALUES ('user', 60000)
   `);

    //user table
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_user (
            email TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            type TEXT,
            FOREIGN KEY (type) REFERENCES garden_user_type(type) ON DELETE SET NULL
        )
    `);

    //plants in a greenhouse
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_plant_greenhouse (
            greenhouse_id INTEGER NOT NULL,
            plant_id INTEGER NOT NULL,
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

    //tabella dei tipi di valore (tipovalore, unitamisurata)
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_value_type (
            type TEXT PRIMARY KEY,
            data TEXT NOT NULL
        )
    `);

    //tabella dei dati dei sensori (idsensore, tipovalore, valore, timestamp)
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_sensor_data (
            sensor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            greenhouse_id INTEGER NOT NULL,
            type TEXT NOT NULL,
            value REAL NOT NULL,
            timestamp INTEGER NOT NULL,
            FOREIGN KEY (greenhouse_id) REFERENCES garden_greenhouse(greenhouse_id) ON DELETE CASCADE
            FOREIGN KEY (type) REFERENCES garden_value_type(type) ON DELETE CASCADE
            FOREIGN KEY (sensor_id) REFERENCES garden_sensor(sensor_id) ON DELETE CASCADE
        )
    `);
    
    //tabella dei sensori collegata ad una serra (idsensore, idserra, tipo, posizione )
    db.run(`
        CREATE TABLE IF NOT EXISTS garden_sensor (
            sensor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            greenhouse_id INTEGER NOT NULL,
            type TEXT NOT NULL,
            position TEXT NOT NULL,
            FOREIGN KEY (greenhouse_id) REFERENCES garden_greenhouse(greenhouse_id) ON DELETE CASCADE
        )
    `);

    //tabella posizione (idposizione, x, y)
    //tabella posizione di una pianta all'interno di una serra  (idpianta, idserra, idposizione)

    

})

module.exports = db;