const express = require('express');
const cors = require('cors');

//DB
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "garden"
});

//connect to DB
con.connect((err) => {
    if(err){
        console.log('DB - Connection failed');
        process.exit();
    }
    console.log('DB - Connected');
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
        if(err){
            res.status(500).json({
                error: "Query failed"
            });
        }
        res.status(200).json(result);
    });
});

//get di una singola pianta
app.get('/plants/:id', (req, res) => {

});

app.put('/plants/:id', (req, res) => {
    
}); 

app.delete('/plants/:id', (req, res) => {
    res.send('ok');
});

app.listen(port, () => {
    console.log(`Server listening on 127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
    console.log('Server shutting down');
    con.end();
    process.exit();
});

