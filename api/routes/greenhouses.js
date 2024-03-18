const { Router } = require('express');

const con = require('../db'); 

const router = Router();

//GREENHOUSE
router.get('/greenhouses', (req, res) => {
    con.query('SELECT * FROM garden_greenhouse', (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(200).json(result);
    });
});

router.post('/greenhouses', (req, res) => {
    const greenhouse = req.body;
    
    con.query('INSERT INTO garden_greenhouse (name, description) VALUES (?, ?)', [greenhouse.name, greenhouse.description], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
    });
    con.query('SELECT MAX(greenhouse_id) as id FROM garden_greenhouse', (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        const id = result[0].id;
        con.query('INSERT INTO garden_personal_greenhouse (greenhouse_id, email) VALUES (?, ?)', [id, greenhouse.email], (err, result, fields) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            else{
                return res.status(201).json({
                    greenhouse_id: id,
                    name: greenhouse.name,
                    description: greenhouse.description
                });
            }
        });
    });
});

router.get('/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM garden_greenhouse WHERE greenhouse_id = ?', [id], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
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
    });
});

router.put('/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    const greenhouse = req.body;
    con.query('UPDATE garden_greenhouse SET name = ?, description = ? WHERE greenhouse_id = ?', [greenhouse.name, greenhouse.description, id], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(200).json({
            code: 200,
            message: "Updated"
        });
    });
});

router.delete('/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM garden_greenhouse WHERE greenhouse_id = ?', [id], (err, result, fields) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(204).json({
            code: 204,
            message: "No content"
        });
    });
});


module.exports = router;