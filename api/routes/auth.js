const { Router } = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../db');

const router = Router();

router.post('/v1/auth/register', (req, res) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const pepper = process.env.PEPPER;
    const password = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, pepper, 1000, 64, 'sha512').toString('hex');

    const refreshToken = jwt.sign(
        { email: req.body.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            issuer: 'api.greenhortus.life'
        }
    )

    db.get('SELECT * FROM api_user WHERE email = ?', [req.body.email], (err, row) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else if (row) {
            res.status(409).json({
                code: 409,
                message: "Email already in use"
            });
        }
        else {
            db.run(`INSERT INTO api_user 
            (email, password, salt, refreshToken, role) 
            VALUES (?, ?, ?, ?, ?)`,
                [req.body.email, hashedPassword, salt, refreshToken, "user"],
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            code: 500,
                            message: "Query failed"
                        });
                    }
                    db.get(`SELECT email, api_user.role, refreshToken, tokenExp
                        FROM api_user
                        JOIN api_role ON api_user.role = api_role.role
                        WHERE api_user.email = ?`,
                        [req.body.email],
                        (err, row) => {
                            if (err) {
                                res.status(500).json({
                                    code: 500,
                                    message: "Query failed"
                                });
                            }
                            else {
                                const accessToken = jwt.sign(
                                    { email: row.email, role: row.role },
                                    process.env.ACCESS_TOKEN_SECRET,
                                    {
                                        algorithm: 'HS256',
                                        expiresIn: row.tokenExp,
                                        issuer: 'api.greenhortus.life'
                                    });
                                row.accessToken = accessToken;
                                delete row.tokenExp;
                                res.status(201).json(row);
                            }
                        });
                });
        }
    });
});

router.post('/v1/auth/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const pepper = process.env.PEPPER;
    db.get(`SELECT *
        FROM api_user
        JOIN api_role ON api_user.role = api_role.role
        WHERE email = ?`,
        [email],
        (err, row) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            else if (!row) {
                res.status(401).json({
                    code: 401,
                    message: "User does not exist"
                });
            }
            else {
                const hashedPassword = crypto.pbkdf2Sync(password, row.salt, 1000, 64, 'sha512').toString('hex');
                const hashedPasswordPepper = crypto.pbkdf2Sync(hashedPassword, pepper, 1000, 64, 'sha512').toString('hex');
                if (hashedPasswordPepper === row.password) {
                    const accessToken = jwt.sign(
                        { email: row.email, role: row.role },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            algorithm: 'HS256',
                            expiresIn: row.tokenExp,
                            issuer: 'api.greenhortus.life'
                        });
                    res.status(200).json({
                        email: row.email,
                        role: row.role,
                        refreshToken: row.refreshToken,
                        accessToken: accessToken
                    });
                }
                else {
                    res.status(401).json({
                        code: 401,
                        message: "Wrong password"
                    });
                }
            }
        });
});

router.post('/v1/auth/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const { email } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    db.get(`SELECT email, api_user.role, refreshToken, tokenExp 
        FROM api_user
        JOIN api_role ON api_user.role = api_role.role
        WHERE email = ?`, [email], (err, row) => {
        if(err){
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else if(!row){
            res.status(401).json({
                code: 401,
                message: "User does not exist"
            });
        }
        else if(refreshToken !== row.refreshToken){
            res.status(401).json({
                code: 401,
                message: "Invalid refresh token"
            });
        }
        else{
            const user = row;
            const refreshToken = jwt.sign(
                { email: email },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    algorithm: 'HS256',
                    issuer: 'api.greenhortus.life'
                }
            );
            db.run(`UPDATE api_user SET refreshToken = ? WHERE email = ?`, [refreshToken, email], (err) => {
                if(err){
                    res.status(500).json({
                        code: 500,
                        message: "Query failed"
                    });
                }
            });
            const accessToken = jwt.sign(
                { email: email },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '1h',
                    issuer: 'api.greenhortus.life'
                });
            res.status(200).json({
                email: user.email,
                role: user.role,
                refreshToken: refreshToken,
                accessToken: accessToken
            });
        }
    });
});

module.exports = router;