const { Router } = require('express');
const db = require('../db');
const isLogged = require('../middleware/isLogged');

const router = Router();

//plants in a greenhouse
router.get('/api/greenhouses/:greenhouseId/plants', isLogged, (req, res) => {
    const id = req.params.greenhouseId;
    db.all('SELECT * FROM plant_greenhouse WHERE greenhouse_id = ?', [id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        if (rows === 0) {
            return res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        return res.status(200).json(rows);
    });
});

router.post('/api/greenhouses/:greenhouseId/plants', isLogged, (req, res) => {
    const greenhouseId = parseInt(req.params.greenhouseId);
    const plantId = parseInt(req.body.plant_id);
    const quantity = parseInt(req.body.quantity);
    db.run('INSERT INTO plant_greenhouse (greenhouse_id, plant_id, quantity ) VALUES (?, ?, ?)', [ greenhouseId, plantId, quantity ], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(201).json({
            greenhouse_id: greenhouseId,
            plant_id: plantId
        });
    });
});

router.patch('/api/greenhouses/:greenhouseId/plants/:plantId', isLogged, (req, res) => {
    const greenhouseId = req.params.greenhouseId;
    const plantId = req.params.plantId;
    const quantity = req.body.quantity;
    db.get('SELECT quantity FROM plant_greenhouse WHERE greenhouse_id = ? AND plant_id = ?', [greenhouseId, plantId], (err, row) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        const newQuantity = row.quantity + quantity;
        db.run('UPDATE plant_greenhouse SET quantity = ? WHERE greenhouse_id = ? AND plant_id = ?', [newQuantity, greenhouseId, plantId], (err, result, fields) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            db.get(`SELECT * 
                    FROM plant_greenhouse g 
                    WHERE g.greenhouse_id = ? AND g.plant_id = ?`, [greenhouseId, plantId], (err, row) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        message: "Query failed"
                    });
                }
                return res.status(200).json(row);
            });
        });
    });
});

router.delete('/api/greenhouses/:greenhouseId/plants/:plantId', isLogged, (req, res) => {
    const greenhouseId = req.params.greenhouseId;
    const plantId = req.params.plantId;
    db.run('DELETE FROM plant_greenhouse WHERE greenhouse_id = ? AND plant_id = ?', [greenhouseId, plantId], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(204).json();
    });
});

module.exports = router;