const passport = require('passport');
dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//db
const db = require('../../db.js');

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URI,
        passReqToCallback: true
    },(request, accessToken, refreshToken, profile, done) => {
        db.run(`INSERT OR IGNORE INTO user (email, name, surname, role) VALUES (?, ?, ?, ?)`,
            [profile.emails[0].value, profile.name.givenName, profile.name.familyName, "user"],
            (err) => {
                if (err) {
                    return done(err);
                }
                return done(null, profile);
            }
        );
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});