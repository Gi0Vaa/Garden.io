const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'garden'
});

connection.connect((err) => {
    if (err) {
        console.log("DB - Connection failed");
    }
    else {
        console.log('DB - Connected');
    }
});

module.exports = connection;