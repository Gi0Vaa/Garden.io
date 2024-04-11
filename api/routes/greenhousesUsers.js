const { Router } = require('express');

const db = require('../db');

const router = Router();

//GREENHOUSE USERS             prima era /api/v1/mapgreenhouses/:email
router.get('/api/v1/users/:email/greenhouses', (req, res) => { 
    const email = req.params.email;
    db.all('SELECT * FROM garden_user_greenhouse WHERE email = ?', [email], (err, rows) => {
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

//prima era /api/v1/mapgreenhouses
router.post('/api/v1/users/:email/greenhouses', (req, res) => { //ti riton
    const { email, greenhouse_id } = req.body;
    db.run('INSERT INTO garden_user_greenhouse (email, greenhouse_id) VALUES (?, ?)', [email, greenhouse_id], (err) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        db.get('SELECT * FROM garden_user_greenhouse WHERE email = ? AND greenhouse_id = ?', [email, greenhouse_id], (err, row) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            res.status(201).json(row);
        });
    });
});

router.delete('/api/v1/mapgreenhouses/:email/:greenhouse_id', (req, res) => {
    const email = req.params.email;
    const greenhouse_id = req.params.greenhouse_id;
    con.query('DELETE FROM garden_user_greenhouse WHERE email = ? AND greenhouse_id = ?', [email, greenhouse_id], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Deleted"
        });
    });
});


module.exports = router;