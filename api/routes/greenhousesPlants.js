const { Router } = require('express');

const con = require('../db');

const router = Router();


//MapPlant
router.get('/mapplants/:greenhouse_id', (req, res) => {
    const id = req.params.greenhouse_id;
    con.query('SELECT * FROM garden_plant_greenhouse WHERE greenhouse_id = ?', [id], (err, result, fields) => {
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

router.post('/mapplants', (req, res) => {
    const map = req.body;
    con.query('INSERT INTO garden_plant_greenhouse (greenhouse_id, plant_id ) VALUES (?, ?)', [map.greenhouse_id, map.plant_id ], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(201).json(map);
    });
});

router.put('/mapplants/:greenhouse_id/:plant_id', (req, res) => {
    const greenhouse_id = req.params.greenhouse_id;
    const plant_id = req.params.plant_id;
    const map = req.body;
    con.query('UPDATE garden_plant_greenhouse SET ? WHERE greenhouse_id = ? AND plant_id = ?', [map, greenhouse_id, plant_id], (err, result, fields) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(200).json(map);
    });
});

router.delete('/mapplants/:greenhouse_id/:plant_id', (req, res) => {
    const greenhouse_id = req.params.greenhouse_id;
    const plant_id = req.params.plant_id;
    con.query('DELETE FROM garden_plant_greenhouse WHERE greenhouse_id = ? AND plant_id = ?', [greenhouse_id, plant_id], (err, result, fields) => {
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