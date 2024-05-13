const { Router } = require('express');
const passport = require('passport');
require('dotenv').config();
require('express-session');
require('./passport');

const router = Router();

router.get('/api/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/api/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: `${process.env.REDIRECT_URL}/?success=true`,
        failureRedirect: `${process.env.REDIRECT_URL}/`
    })
);

router.get('/api/auth/user', (req, res) => {
    res.json(req.user);
});

router.get('/api/auth/logout', (req, res) => {
    req.logout((err) => {
        if(err) return next(err);
        req.session.destroy();
        res.send('Logged out');
    });

});

module.exports = router;