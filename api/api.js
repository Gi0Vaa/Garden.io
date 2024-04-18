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

//check JWT
app.use((req, res, next) => {
    if(req.path === '/api/v1/login'){
        next();
    }
    else{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                code: 401,
                message: "Unauthorized"
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            next();
        } catch (err) {
            return res.status(401).json({
                code: 401,
                message: "Unauthorized"
            });
        }
    }
});


//ROUTES
const routes = require('./routes/endpoints.js');

app.use(routes.users);
app.use(routes.plants);
app.use(routes.greenhouses);
app.use(routes.greenhousesUsers);
app.use(routes.greenhousesPlants);

//auth
app.post('/api/v1/login', (req, res) => {
    const user = req.body;
    db.get('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, row) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        } else if (!row) {
            return res.status(404).json({
                code: 404,
                message: "User does not exist"
            });
        } else {
            //FIXME: contrtolla se è un metodo valido
            const token = jwt.sign({ ...row }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json(
                {
                    code: 200,
                    message: "User logged in",
                }
            );
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