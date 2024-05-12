require('dotenv').config();

const express = require('express'); 
const cors = require('cors');
const router = require('express').Router();

const app = express();

const corsOptions = {
    origin: 'https://greenhortus.life',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const port = 3001;

//log delle richieste
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} dal client ${req.ip}:${req.socket.remotePort}`);
    next();
});

//routes
const routes = require('./routes/endpoints');
app.use(routes.greenhouses);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = router;