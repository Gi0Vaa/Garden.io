const express = require('express');
const cors = require('cors');

const yaml = require('yamljs');
const apiSpec = yaml.load('./api_specs.yaml');

const swaggerUi = require('swagger-ui-express');

//const OpenApiValidator = require('express-openapi-validator');

const app = express();

app.use(express.json()); // JSON
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(apiSpec));

/*
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) { // if received origin is in whitelist or is undefined (no origin), allow
            callback(null, true);
        } else { // if origin is not whitelisted, block
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET, PUT, POST, DELETE',
    credentials: false,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOptions));    // enable CORS
*/

/*
app.use(validator);

app.use((err, req, res, next) => { //gestione degli errori di openapi validator

    console.error(`Errore su ${req.method} ${req.path} : ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });

});

app.use((req, res, next) => { //log delle richieste
    console.log(`${req.method} ${req.path} dal client ${req.ip} con porta ${req.socket.remotePort}`);
    next();
});
*/

app.post('/plants', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

app.get('/plants', (req, res) => {
    res.send('ok');
});

app.get('/plants/:id', (req, res) => {
    res.send('ok');
});

app.put('/plants/:id', (req, res) => {
    res.send('ok');
}); 

app.delete('/plants/:id', (req, res) => {
    res.send('ok');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

