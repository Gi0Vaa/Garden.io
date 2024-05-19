const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'api_garden',
    connectionLimit: 5
});

module.exports = pool;