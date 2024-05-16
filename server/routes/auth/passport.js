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
    }, (request, accessToken, refreshToken, profile, done) => {
        db.get("SELECT * FROM user WHERE g_id = ?", [profile.id], (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            }
            else {
                db.run("INSERT INTO user (email, g_id, name, surname, pfp, role) VALUES (?, ?, ?, ?, ?, ?)",
                    [profile.emails[0].value, profile.id, profile.name.givenName || "", profile.name.familyName || "", profile.photos[0].value, "user"],
                    (err) => {
                        if (err) {
                            return done(err);
                        }
                        else {
                            return done(null, { email: profile.emails[0].value, g_id: profile.id, name: profile.name.givenName, surname: profile.name.familyName, pfp: profile.photos[0].value, role: this.user });
                        }
                    });
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    db.get('SELECT * FROM user WHERE email = ?', [email], (err, user) => {
        if (err) return done(err);
        done(null, user);
    });
});