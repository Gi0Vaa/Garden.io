const { Router } = require('express');

const db = require('../db');

const router = Router();

router.get('/api/v1/greenhouses/:greenhouse_id/plants', (req, res) => {
    const id = req.params.greenhouse_id;
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

router.post('/api/v1/greenhouses/:greenhouseId/plants/:plantId', (req, res) => {
    const greenhouseId = req.params.greenhouseId;
    const plantId = req.params.plantId;
    db.run('INSERT INTO garden_plant_greenhouse (greenhouse_id, plant_id ) VALUES (?, ?)', [ greenhouseId, plantId ], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(201).json(map);
    });
});

router.delete('/api/v1/greenhouses/:greenhouseId/plants/:plantId', (req, res) => {
    const greenhouseid = req.params.greenhouseId;
    const plantid = req.params.plantId;
    db.run('DELETE FROM garden_plant_greenhouse WHERE greenhouse_id = ? AND plant_id = ?', [greenhouseId, plantId], (err, result, fields) => {
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