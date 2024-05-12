const { Router } = require('express');
const passport = require('passport');
const session = require('express-session');
require('./passport');

const router = Router();

router.get('/api/v1/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/api/v1/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/api/v1/swagger',
        failureRedirect: '/api/v1/auth/google'
    })
);

router.get('/api/v1/auth/logout', (req, res) => {
    req.logout((err) => {
        if(err) return next(err);
        req.session.destroy();
        res.send('Logged out');
    });

});

module.exports = router;