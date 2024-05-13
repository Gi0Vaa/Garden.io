const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('garden.sqlite3');

//DDL
db.serialize(() => {
    //enable foreign keys
    db.run('PRAGMA foreign_keys = ON');

    //greenhouse table
    db.run(`
        CREATE TABLE IF NOT EXISTS greenhouse (
            greenhouse_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            temperature TEXT DEFAULT '0',
            humidity INTEGER DEFAULT 0
        )
    `);

    //type table
    db.run(`
        CREATE TABLE IF NOT EXISTS role (
            role TEXT PRIMARY KEY,
            session_time INTEGER NOT NULL --in milliseconds
        )
    `);

    //types of users
    db.run(`
       INSERT OR IGNORE INTO role (role, session_time) VALUES 
        ('user', 60000),
        ('admin', 60000)
   `);

    //user table
    db.run(`
        CREATE TABLE IF NOT EXISTS user (
            email TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            role TEXT,
            FOREIGN KEY (role) REFERENCES garden_role(role) ON DELETE SET NULL
        )
    `);

    //plants in a greenhouse
    db.run(`
        CREATE TABLE IF NOT EXISTS plant_greenhouse (
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
        CREATE TABLE IF NOT EXISTS user_greenhouse (
            greenhouse_id INTEGER NOT NULL,
            email TEXT NOT NULL,
            PRIMARY KEY (greenhouse_id, email),
            FOREIGN KEY (greenhouse_id) REFERENCES garden_greenhouse(greenhouse_id) ON DELETE CASCADE,
            FOREIGN KEY (email) REFERENCES garden_user(email) ON DELETE CASCADE
        )
    `);
})

module.exports = db;