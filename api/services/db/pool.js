const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aw077rmn',
    database: 'api_garden',
    connectionLimit: 5
});

module.exports = pool;