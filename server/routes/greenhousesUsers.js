const { Router } = require('express');

const db = require('../db');
const isLogged = require('../middleware/isLogged');

const router = Router();

//greenhouse of a user
router.get('/api/users/:email/greenhouses', isLogged, (req, res) => { 
    const email = req.params.email;
    db.all(`SELECT * 
            FROM user_greenhouse
            WHERE email = ?`, 
            [email], 
            (err, rows) => {
            if (err) {
                return res.sendStatus(500);
            }
            if (rows.length === 0) {
                return res.sendStatus(404);
            }
            return res.status(200).json(rows);
        }
    );
});

//add a greenhouse to a user
router.post('/api/users/greenhouses', isLogged, (req, res) => {
    const data = req.body;
    db.run(`INSERT INTO user_greenhouse (email, greenhouse_id) VALUES (?, ?)`, 
            [data.email, data.greenhouse_id], 
            (err) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        message: "Query failed"
                    });
                }
                return res.status(201).json({
                    code: 201,
                    message: "Greenhouse added to user"
                });
            }
    );
});


module.exports = router;