require('dotenv').config();

const express = require('express'); 
const cors = require('cors');
const router = require('express').Router();
const session = require('express-session');
const passport = require('passport');

const app = express();

const corsOptions = {
    origin: 'https://greenhortus.life',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

const port = 3001;

//log delle richieste
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} dal client ${req.ip}:${req.socket.remotePort}`);
    next();
});

//auth
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
const routes = require('./routes/endpoints');

app.use(routes.auth);
app.use(routes.greenhouses);
app.use(routes.greenhousesUsers);
app.use(routes.plants);
app.use(routes.greenhousesPlants);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = router;