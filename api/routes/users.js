const { Router } = require('express');
const con = require('../db/connection.js');

const router = Router();

//USERS
router.get('/users', (req, res) => {
    con.query('SELECT * FROM garden_user', (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        if (result.length === 0) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        res.status(200).json(result);
    });
});

router.get('/users/:email', (req, res) => {
    const email = req.params.email;
    con.query('SELECT * FROM garden_user WHERE email = ?', [email], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else if (result.length === 0) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        else {
            res.status(200).json(result[0]);
        }
    })
})

router.post('/users', (req, res) => {
    const user = req.body;
    con.query('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else {
            if (result.length === 0) {
                con.query('INSERT INTO garden_user (email, name, surname, type) VALUES (?, ?, ?, ?)', [user.email, user.name, user.surname, 'user'], (err, result, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: "Query failed"
                        });
                    }
                    con.query('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, result, fields) => {
                        if (err) {
                            res.status(500).json({
                                error: "Query failed"
                            });
                        }
                        res.status(201).json(result[0]);
                    });
                });
            }
            else {
                res.status(409).json({
                    code: 409,
                    message: "User already exist"
                });
            }

        }
    });
});

router.put('/users/:email', (req, res) => {
    const email = req.params.email;
    const user = req.body;
    con.query('UPDATE garden_user SET name = ?, surname = ? WHERE email = ?', [user.name, user.surname, email], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        res.status(200).json({
            code: 200,
            message: "Updated"
        });
    });
});

module.exports = router;