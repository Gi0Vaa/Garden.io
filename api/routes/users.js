const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

const db = require('../db');

const router = Router();

//v1/users
router.get('/v1/users', isAuthenticated(["admin"]), (req, res) => {
    db.all('SELECT * FROM api_user', (err, rows) => {
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

router.get('/v1/users/:email', isAuthenticated(["admin"]), (req, res) => {
    const email = req.params.email;
    db.get('SELECT * FROM api_user WHERE email = ?', [email], (err, row) => {
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

router.post('/v1/users', isAuthenticated(["admin"]), (req, res) => {
    const user = req.body;
    db.run('INSERT INTO api_user (email, name, surname, role) VALUES (?, ?, ?, ?)', [user.email, user.name, user.surname, 'user'], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        db.get('SELECT * FROM api_user WHERE email = ?', [user.email], (err, row) => {
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

router.put('/v1/users/:email', isAuthenticated(["admin"]), (req, res) => {
    const email = req.params.email;
    const user = req.body;
    db.run('UPDATE api_user SET name = ?, surname = ? WHERE email = ?', [user.name, user.surname, email], (err) => {
        if (err) {
            return res.status(500).json({
                error: "Query failed"
            });
        }
        db.get('SELECT * FROM api_user WHERE email = ?', [email], (err, row) => {
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

router.delete('/v1/users/:email', isAuthenticated(["admin"]), (req, res) => {
    const email = req.params.email;
    db.run('DELETE FROM api_user WHERE email = ?', [email], (err) => {
        if (err) {
            return res.status(500).json({
                error: "Query failed"
            });
        }
        res.status(204).send();
    });
});

module.exports = router;