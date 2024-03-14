const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "garden"
});

con.connect((err) => {
    if (err) {
        console.log('DB - Connection failed');
        process.exit();
    }
    else {
        console.log('DB - Connected');
    }
});

module.exports = con;