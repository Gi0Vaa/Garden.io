const { Router } = require('express');

const db = require('../db');

const router = Router();

//api/v1/users
router.get('/api/v1/users', (req, res) => {
    db.all('SELECT * FROM garden_user', (err, rows) => {
        if (err) {
            res.status(500).json({
                code: 500,
                error: "Query failed"
            });
        }
        else {
            res.status(200).json(rows);
        }
    });
});

router.get('/api/v1/users/:email', (req, res) => {
    const email = req.params.email;
    db.get('SELECT * FROM garden_user WHERE email = ?', [email], (err, row) => {
        if (err) {
            res.status(500).json({
                code: 404,
                message: "Query failed"
            });
        }
        else if (!row) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        else {
            res.status(200).json(row);
        }
    });
})

router.post('/api/v1/users', (req, res) => {
    const user = req.body;
    db.run('INSERT INTO garden_user (email, name, surname, type) VALUES (?, ?, ?, ?)', [user.email, user.name, user.surname, 'user'], (err) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        db.get('SELECT * FROM garden_user WHERE email = ?', [user.email], (err, row) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            else {
                res.status(201).json(row);
            }
        });
    });


});

router.put('/api/v1/users/:email', (req, res) => {
    const email = req.params.email;
    const user = req.body;
    db.run('UPDATE garden_user SET name = ?, surname = ? WHERE email = ?', [user.name, user.surname, email], (err) => {
        if (err) {
            return res.status(500).json({
                error: "Query failed"
            });
        }
        db.get('SELECT * FROM garden_user WHERE email = ?', [email], (err, row) => {
            if (err) {
                res.status(500).json({
                    error: "Query failed"
                });
            }
            else {
                res.status(200).json(row);
            }
        });
    });
});

router.delete('/api/v1/users/:email', (req, res) => {
    const email = req.params.email;
    db.run('DELETE FROM garden_user WHERE email = ?', [email], (err) => {
        if (err) {
            return res.status(500).json({
                error: "Query failed"
            });
        }
        res.status(204).send();
    });
});

module.exports = router;