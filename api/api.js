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
    db.all('SELECT * FROM plants', (err, rows) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(rows);
    });
});

//get di una singola pianta
app.get('/plants/:id', (req, res) => {
    //controllo id valido (intero)
    const idpassato = parseInt(req.params.id);
    console.log(idpassato);
    if (isNaN(idpassato)) {
        res.status(400).send('id non valido');
        return;
    }
    db.get(`SELECT * FROM plants WHERE idPianta = ${idpassato}`, (err, row) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (row === undefined) {
            res.status(404).json({error: 'Pianta non trovata'});
            return;
        }
        res.json(row);
        
    });

});

app.put('/plants/:id', (req, res) => {
    
}); 

app.delete('/plants/:id', (req, res) => {
    res.send('ok');
});

app.listen(port, () => {
    console.log(`Server listening on 127.0.0.1:${port}`);
});

