const passport = require('passport');
dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = require('../../services/db/users');

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URI,
        passReqToCallback: true
    }, async (request, accessToken, refreshToken, profile, done) => {
        const user = await users.getUser(profile.emails[0].value);
        if(!user){
            const newUser = await users.createUser(profile.id, profile.emails[0].value, profile.name.givenName || "", profile.name.familyName || "", profile.photos[0].value, "user");
            if(newUser === false){
                return done(null, false);
            }
            return done(null, newUser);
        }
        else{
            return done(null, user);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    const user = await users.getUser(email);
    done(null, user);
});