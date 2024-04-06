const { Router } = require('express');

const db = require('../db');

const router = Router();
router.post('/api/v1/plants', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

//get di tutte le piante
router.get('/api/v1/plants', async (req, res) => {
    db.all('SELECT * FROM garden_plant', (err, rows) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else {
            res.status(200).json(rows);
        }
    });
});

//get di una singola pianta
router.get('/api/v1/plants/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM garden_plant WHERE plant_id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else if (!row) {
            res.status(404).json({
                error: "Not found"
            });
        }
        else {
            res.status(200).json(row);
        }
    });
});

//ricerca di tutte le piante che contengono la stringa passata
router.get('/api/v1/plants/research/:name', (req, res) => {
    const name = req.params.name;
    db.all('SELECT * FROM garden_plant WHERE name LIKE ?', ['%' + name + '%'], (err, rows) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else {
            res.status(200).json(rows);
        }
    });
})

router.put('/api/v1/plants/:id', (req, res) => {
    const id = req.params.id;
    db.run('UPDATE garden_plant SET ? WHERE plant_id = ?', [req.body, id], (err) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        db.get('SELECT * FROM garden_plant WHERE plant_id = ?', [id], (err, row) => {
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

router.delete('/api/v1/plants/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM garden_plant WHERE plant_id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({
                error: "Query failed"
            });
        }
        else {
            res.status(200).json({
                code: 200,
                message: "Deleted"
            });
        }
    });
});

module.exports = router;