//express
const express = require('express');
const cors = require('cors');

//router
const router = require('express').Router();

//swagger and openapi
const yaml = require('yamljs');
const apiSpec = yaml.load('./api_specs.yaml');

const swaggerUi = require('swagger-ui-express');
const openApiValidator = require('express-openapi-validator');

//jwt
const jwt = require('jsonwebtoken');

//application
const app = express();
const port = 8080;

//db
const db = require('./db.js');

app.use(express.json()); // JSON
app.use(cors({  //CORS allowed all origin
    origin: '*'
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

 //middleware jwt per verificare il token
/*function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'CHIAVESEGRETA', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}
*/

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
app.post('/api/v1/login', (req, res) => {
    const user = req.body;
    db.get('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, row) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        } else if (!row) {
            res.status(404).json({
                code: 404,
                message: "User does not exist"
            });
        } else {
            const token = jwt.sign({ ...row }, 'CHIAVESEGRETA');
            res.status(200).json({ token: token });
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