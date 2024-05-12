const passport = require('passport');
dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const db = require('../../db');

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/v1/auth/google/callback',
        passReqToCallback: true
    },(request, accessToken, refreshToken, profile, done) => {
        db.get("SELECT * FROM garden_user WHERE email = ?", [profile.emails[0].value], (err, row) => {
            if (err) {
                return done(err);
            }
            if (!row) {
                //insert the user
                db.run("INSERT INTO garden_user (email, name, surname, role) VALUES (?, ?, ?, ?)", [profile.emails[0].value, profile.name.givenName, profile.name.familyName, 'user'], (err) => {
                    if (err) {
                        return done(err);
                    }
                    db.get("SELECT * FROM garden_user WHERE email = ?", [profile.emails[0].value], (err, row) => {
                        if (err) {
                            return done(err);
                        }
                        return done(null, row);
                    });
                });
            }
            else {
                return done(null, row);
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});