const { Router } = require('express');

const con = require('../db');

const router = Router();


//GREENHOUSE USERS
router.get('/api/v1/mapgreenhouses/:email', (req, res) => {
    const email = req.params.email;
    con.query('SELECT * FROM garden_personal_greenhouse WHERE email = ?', [email], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        if (result.length === 0) {
            return res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        return res.status(200).json(result);
    });
});

router.post('/api/v1/mapgreenhouses', (req, res) => {
    const { email, greenhouse_id } = req.body;
    con.query('INSERT INTO garden_personal_greenhouse (email, greenhouse_id) VALUES (?, ?)', [email, greenhouse_id], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(201).json({
            code: 201,
            message: "Created"
        });
    });
});

router.delete('/api/v1/mapgreenhouses/:email/:greenhouse_id', (req, res) => {
    const email = req.params.email;
    const greenhouse_id = req.params.greenhouse_id;
    con.query('DELETE FROM garden_personal_greenhouse WHERE email = ? AND greenhouse_id = ?', [email, greenhouse_id], (err, result, fields) => {
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