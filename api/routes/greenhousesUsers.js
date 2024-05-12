const { Router } = require('express');
const jwt = require('jsonwebtoken');

const db = require('../db');

const router = Router();

router.get('/api/v1/users/:email/greenhouses', (req, res) => { 
    const email = req.params.email;
    db.all(`SELECT g.* 
            FROM garden_user_greenhouse u
            JOIN garden_greenhouse g ON u.greenhouse_id = g.greenhouse_id
            WHERE email = ?`, [email], (err, rows) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        if (rows.length === 0) {
            return res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        return res.status(200).json(rows);
    });
});


module.exports = router;