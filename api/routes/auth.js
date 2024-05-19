const { Router } = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = require('../services/db/auth');
const { getUser } = require('../services/db/users');

const router = Router();

router.post('/v1/auth/register', async (req, res) => {
    const user = req.body;
    if(await getUser(user.email)){
        return res.status(409).json({
            code: 409,
            message: "Email already in use"
        });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const pepper = process.env.PEPPER;
    const password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, pepper, 1000, 64, 'sha512').toString('hex');

    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            issuer: 'api.greenhortus.life'
        }
    )

    user.password = hashedPassword;
    user.salt = salt;
    user.refreshToken = refreshToken;

    const createdUser = await auth.register(user);
    if(createdUser){
        const accessToken = jwt.sign(
            { email: createdUser.email, role: createdUser.role },
            process.env.ACCESS_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1h',
                issuer: 'api.greenhortus.life'
            });
        res.status(201).json({
            email: createdUser.email,
            role: createdUser.role,
            refreshToken: refreshToken,
            accessToken: accessToken
        });
    }
    else{
        res.status(500).json({
            code: 500,
            message: "Query failed"
        });
    }
});

router.post('/v1/auth/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await auth.login(email, password)
    if(!user){
        return res.status(401).json({
            code: 401,
            message: "User does not exist"
        });
    }
    const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: user.tokenExp,
            issuer: 'api.greenhortus.life'
        });
    
    res.status(200).json({
        email: user.email,
        role: user.role,
        refreshToken: user.refreshToken,
        accessToken: accessToken
    });
});

router.post('/v1/auth/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const { email } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await auth.checkRefreshToken(email, refreshToken)
    if(!user){
        return res.status(401).json({
            code: 401,
            message: "Invalid refresh token"
        });
    }

    const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: user.tokenExp,
            issuer: 'api.greenhortus.life'
        });

    const newRefreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            issuer: 'api.greenhortus.life'
        });
    
    
    const updatedUser = await auth.updateRefreshToken(email, newRefreshToken);
    if(updatedUser){
        res.status(200).json({
            email: updatedUser.email,
            role: updatedUser.role,
            refreshToken: newRefreshToken,
            accessToken: accessToken
        });
    }
    else{
        res.status(500).json({
            code: 500,
            message: "Internal server error"
        });
    }
});

module.exports = router;