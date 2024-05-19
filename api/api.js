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

//create database
require('./services/db/db.js').createDatabase();

//create tables
require('./services/db/db.js').createTables();

app.use(express.json()); // JSON
app.use(cookieParser()); //cookie parser
app.use(cors({  //CORS allowed all origin
    origin: true,
    credentials: true
}));

//Swagger UI
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(apiSpec));

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

app.use(routes.auth);
app.use(routes.users);
app.use(routes.plants);

app.listen(port, () => {
    console.log(`Server listening on 127.0.0.1:${port}`);
});


process.on('SIGINT', () => {
    console.log('Server shutting down');
    process.exit();
});


module.exports = router;