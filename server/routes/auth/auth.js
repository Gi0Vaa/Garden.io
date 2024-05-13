const { Router } = require('express');
const passport = require('passport');
require('express-session');
require('./passport');

const router = Router();

router.get('/api/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/api/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/?success=true',
        failureRedirect: 'http://localhost:3000/'
    })
);

router.get('/api/auth/user', (req, res) => {
    console.log(req);
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