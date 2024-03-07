//const router = require('express').Router();
const express = require('express');
const cors = require('cors');

//DB
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


//swagger and openapi
const yaml = require('yamljs');
const apiSpec = yaml.load('./api_specs.yaml');

const swaggerUi = require('swagger-ui-express');
const openApiValidator = require('express-openapi-validator');

const app = express();
const port = 8080;

app.use(express.json()); // JSON
app.use(cors({  //CORS allowed all origin
    origin: '*'
}));

//Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(apiSpec));

//Validatore API
app.use(
    openApiValidator.middleware({
        apiSpec: './api_specs.yaml',
        validateRequests: true,
        validateResponses: true
    })
)
//Errori di validazione
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

app.use((req, res, next) => { //log delle richieste
    console.log(`${req.method} ${req.path} dal client ${req.ip}:${req.socket.remotePort}`);
    next();
});

app.post('/plants', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

//get di tutte le piante
app.get('/plants', async (req, res) => {
    con.query('SELECT * FROM garden_plant', (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        res.status(200).json(result);
    });
});

//get di una singola pianta
app.get('/plants/:id', (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM garden_plant WHERE plant_id = ?', [id], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else if (result.length === 0) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        else {
            res.status(200).json(result[0]);
        }
    })
});

app.put('/plants/:id', (req, res) => {

});

app.delete('/plants/:id', (req, res) => {
    res.send('ok');
});

//USERS
app.get('/users', (req, res) => {
    con.query('SELECT * FROM garden_user', (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        if (result.length === 0) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        res.status(200).json(result);
    });
});

app.get('/users/:email', (req, res) => {
    const email = req.params.email;
    con.query('SELECT * FROM garden_user WHERE email = ?', [email], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else if (result.length === 0) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        else {
            res.status(200).json(result[0]);
        }
    })
})

app.post('/users', (req, res) => {
    const user = req.body;
    con.query('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else {
            if (result.length === 0) {
                con.query('INSERT INTO garden_user (email, name, surname, type) VALUES (?, ?, ?, ?)', [user.email, user.name, user.surname, 'user'], (err, result, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: "Query failed"
                        });
                    }
                    con.query('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, result, fields) => {
                        if (err) {
                            res.status(500).json({
                                error: "Query failed"
                            });
                        }
                        res.status(201).json(result[0]);
                    });
                });
            }
            else {
                res.status(409).json({
                    code: 409,
                    message: "User already exist"
                });
            }

        }
    });
});

app.put('/users/:email', (req, res) => {
    const email = req.params.email;
    const user = req.body;
    con.query('UPDATE garden_user SET name = ?, surname = ? WHERE email = ?', [user.name, user.surname, email], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        res.status(200).json({
            code: 200,
            message: "Updated"
        });
    });
});


//GREENHOUSE
app.get('/greenhouses', (req, res) => {
    con.query('SELECT * FROM garden_greenhouse', (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(200).json(result);
    });
});

app.post('/greenhouses', (req, res) => {
    const greenhouse = req.body;
    con.query('INSERT INTO garden_greenhouse (name, description) VALUES (?, ?)', [greenhouse.name, greenhouse.description], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
    });
    con.query('SELECT MAX(greenhouse_id) as id FROM garden_greenhouse', (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        const id = result[0].id;
        con.query('INSERT INTO garden_personal_greenhouse (greenhouse_id, email) VALUES (?, ?)', [id, greenhouse.email], (err, result, fields) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
        });
    });

    res.status(201).json({
        code: 201,
        message: "Created"
    });
});

app.get('/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM garden_greenhouse WHERE greenhouse_id = ?', [id], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else if (result.length === 0) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        else {
            res.status(200).json(result[0]);
        }
    });
});

app.put('/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    const greenhouse = req.body;
    con.query('UPDATE garden_greenhouse SET name = ?, description = ? WHERE greenhouse_id = ?', [greenhouse.name, greenhouse.description, id], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(200).json({
            code: 200,
            message: "Updated"
        });
    });
});

app.delete('/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM garden_greenhouse WHERE greenhouse_id = ?', [id], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(204).json({
            code: 204,
            message: "No content"
        });
    });
});

//GREENHOUSE USERS
app.get('/greenhouses/users/:email', (req, res) => {
    const email = req.params.email;
    con.query('SELECT * FROM garden_personal_greenhouse WHERE email = ?', [email], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        if (result.length === 0) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        res.status(200).json(result);
    });
});





app.listen(port, () => {
    console.log(`Server listening on 127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
    console.log('Server shutting down');
    con.end();
    process.exit();
});



//module.exports = router;