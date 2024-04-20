//express
const express = require('express');
const cors = require('cors');

//environmet variables
require('dotenv').config();

//router
const router = require('express').Router();

//swagger and openapi
const yaml = require('yamljs');
const apiSpec = yaml.load('./api_specs.yaml');

const swaggerUi = require('swagger-ui-express');
const openApiValidator = require('express-openapi-validator');

//jwt
const jwt = require('jsonwebtoken');
//cookie parser
const cookieParser = require('cookie-parser');

//application
const app = express();
const port = 8080;

//db
const db = require('./db.js');

app.use(express.json()); // JSON
app.use(cookieParser()); //cookie parser
app.use(cors({  //CORS allowed all origin
    origin: true,
    credentials: true
}));

//Swagger UI
app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(apiSpec));

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

//ROUTES
const routes = require('./routes/endpoints.js');

app.use(routes.users);
app.use(routes.plants);
app.use(routes.greenhouses);
app.use(routes.greenhousesUsers);
app.use(routes.greenhousesPlants);

//auth
app.post('/api/v1/register', (req, res) => {
    const user = req.body;
    db.get('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, row) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        if (row) {
            return res.status(409).json({
                code: 409,
                message: "User already exists"
            });
        }
        else {
            const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: '30d',
                issuer: 'garden.io',
                subject: user.email
            });
            db.run('INSERT INTO garden_user (email, name, surname, token, role) VALUES (?, ?, ?, ?, ?)', [user.email, user.name, user.surname, refreshToken, 'user'], (err) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        message: "Query failed"
                    });
                }
                else{
                    db.get('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, row) => {
                        res.status(201).json(row);
                    });
                }
            });
        }
    });
});

app.post('/api/v1/login', (req, res) => {
    const user = req.body;
    db.get('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, row) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else if (!row) {
            return res.status(404).json({
                code: 404,
                message: "User does not exist"
            });
        }
        else {
            const refreshToken = row.token;
            delete row.token;

            const accessToken = jwt.sign({ ...row }, process.env.JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: '1h',
                issuer: 'garden.io',
                subject: row.email
            });

            //save refresh token in db
            db.run('UPDATE garden_user SET token = ? WHERE email = ?', [refreshToken, row.email]);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 60 * 60 * 1000
            });


            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.status(200).json(row);
        }
    });
});


app.listen(port, () => {
    console.log(`Server listening on 127.0.0.1:${port}`);
});


process.on('SIGINT', () => {
    console.log('Server shutting down');
    process.exit();
});


module.exports = router;