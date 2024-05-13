const passport = require('passport');
require('express-session');
require('../routes/auth/passport');

function isLogged(req, res, next) {
    req.user ? next() : res.status(401).json({message: "Unauthorized"});
}

module.exports = isLogged;