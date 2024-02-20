const express = require('express');
const cors = require('cors');

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

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('plants.db');

//initialize DB
require('./DB/dbFunctions').init(db);

app.use((req, res, next) => { //log delle richieste
    console.log(`${req.method} ${req.path} dal client ${req.ip} con porta ${req.socket.remotePort}`);
    next();
});

app.post('/plants', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

app.get('/plants', async (req, res) => {
    db.all('SELECT * FROM plants', (err, rows) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        console.log(rows);
        res.send(rows);
    });
});

app.get('/plants/:id', (req, res) => {
    
});

app.put('/plants/:id', (req, res) => {
    res.send('ok');
}); 

app.delete('/plants/:id', (req, res) => {
    res.send('ok');
});

app.listen(port, () => {
    console.log(`Server listening on 127.0.0.1:${port}`);
});

