const { Router } = require('express');

const db = require('../db'); 
const isLogged = require('../middleware/isLogged');

const router = Router();

//GREENHOUSE
router.get('/api/greenhouses', isLogged, (req, res) => {
    db.all('SELECT * FROM greenhouse', (err, rows) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        res.status(200).json(rows);
    });
});

router.post('/api/greenhouses', isLogged, (req, res) => {
    const greenhouse = req.body;
    
    db.run('INSERT INTO greenhouse (name, description) VALUES (?, ?)', [greenhouse.name, greenhouse.description], (err) => {
        if (err) {
            return res.sendStatus(500);
        }
    });
    
    db.run(`
        INSERT INTO user_greenhouse (greenhouse_id, email) VALUES (
            (SELECT MAX(greenhouse_id) FROM greenhouse),
            ?
        )`, [greenhouse.email], (err) => {
            if(err){
                return res.sendStatus(500);
            }
            db.get('SELECT * FROM greenhouse WHERE greenhouse_id = (SELECT MAX(greenhouse_id) FROM greenhouse)', (err, row) => {
                if (err) {
                    return res.sendStatus(500);
                }
                res.status(201).json(row);
            });
        }
    );

});

router.get('/api/greenhouses/:id', isLogged, (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM greenhouse WHERE greenhouse_id = ?', [id], (err, row) => {
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

router.put('/api/greenhouses/:id', isLogged, (req, res) => {
    const id = req.params.id;
    const greenhouse = req.body;

    db.run('UPDATE greenhouse SET name = ?, description = ?, temperature = ?, humidity = ? WHERE greenhouse_id = ?', [greenhouse.name, greenhouse.description, greenhouse.temperature, greenhouse.humidity, id], (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else {
            db.get('SELECT * FROM greenhouse WHERE greenhouse_id = ?', [id], (err, row) => {
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

router.delete('/api/greenhouses/:id', isLogged, (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM greenhouse WHERE greenhouse_id = ?', [id], (err) => {
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

module.exports = router;