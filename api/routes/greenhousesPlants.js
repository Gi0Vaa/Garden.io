const { Router } = require('express');

const db = require('../db');

const router = Router();

//plants in a greenhouse
router.get('/api/v1/greenhouses/:greenhouseId/plants', (req, res) => {
    const id = req.params.greenhouseId;
    db.all('SELECT * FROM garden_plant_greenhouse WHERE greenhouse_id = ?', [id], (err, rows) => {
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

router.post('/api/v1/greenhouses/:greenhouseId/plants', (req, res) => {
    const greenhouseId = parseInt(req.params.greenhouseId);
    const plantId = parseInt(req.body.plant_id);
    db.run('INSERT INTO garden_plant_greenhouse (greenhouse_id, plant_id ) VALUES (?, ?)', [ greenhouseId, plantId ], (err, result, fields) => {
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

router.delete('/api/v1/greenhouses/:greenhouseId/plants/:plantId', (req, res) => {
    const greenhouseId = req.params.greenhouseId;
    const plantId = req.params.plantId;
    db.run('DELETE FROM garden_plant_greenhouse WHERE greenhouse_id = ? AND plant_id = ?', [greenhouseId, plantId], (err, result, fields) => {
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