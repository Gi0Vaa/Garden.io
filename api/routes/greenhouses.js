const { Router } = require('express');

const db = require('../db'); 

const router = Router();

//GREENHOUSE

router.get('/api/v1/greenhouses', (req, res) => {
    db.all('SELECT * FROM garden_greenhouse', (err, rows) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(200).json(rows);
    });
});

router.post('/api/v1/greenhouses', (req, res) => {
    const greenhouse = req.body;
    
    db.run('INSERT INTO garden_greenhouse (name, description) VALUES (?, ?)', [greenhouse.name, greenhouse.description], (err) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
    });
    
    db.run(`
        INSERT INTO garden_user_greenhouse (greenhouse_id, email) VALUES (
            (SELECT MAX(greenhouse_id) FROM garden_greenhouse),
            ?
        )`, [greenhouse.email], (err) => {
            if(err){
                return res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            db.get('SELECT * FROM garden_greenhouse WHERE greenhouse_id = (SELECT MAX(greenhouse_id) FROM garden_greenhouse)', (err, row) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        message: "Query failed"
                    });
                }
                res.status(201).json(row);
            });
        }
    );

});

router.get('/api/v1/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM garden_greenhouse WHERE greenhouse_id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else if (!row) {
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        else {
            res.status(200).json(row);
        }
    });
});

router.put('/api/v1/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    const greenhouse = req.body;

    db.run('UPDATE garden_greenhouse SET name = ?, description = ? WHERE greenhouse_id = ?', [greenhouse.name, greenhouse.description, id], (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else {
            db.get('SELECT * FROM garden_greenhouse WHERE greenhouse_id = ?', [id], (err, row) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        message: "Query failed"
                    });
                }
                res.status(200).json(row);
            });
        }
    });
});

router.delete('/api/v1/greenhouses/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM garden_user_greenhouse WHERE greenhouse_id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else{
            res.status(204).json({
                code: 204,
                message: "Deleted"
            });
        }
    });
});

//plants in a greenhouse
router.get('/api/v1/greenhouses/plants', (req, res) => {
    db.all('SELECT * FROM garden_plant_greenhouse', [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        return res.status(200).json(rows);
    });
});


module.exports = router;