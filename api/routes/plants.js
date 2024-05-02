const { Router } = require('express');
const jwt = require('jsonwebtoken');

const db = require('../db');
const refreshAccessToken = require('../middlewares/refreshAccessToken');

const router = Router();

const validateRequests = (requiredRoles) => {
    return (req, res, next) => {
        if(!req.cookies.accessToken) return refreshAccessToken(req, res, next);
        const { exp } = jwt.decode(req.cookies.accessToken);
        if(exp < Date.now() / 1000){
            refreshAccessToken(req, res, next);
        }
        else{
            const accessToken = jwt.decode(req.cookies.accessToken);
            if(requiredRoles.includes(accessToken.role)){
                next();
            }
            else{
                return res.status(401).json({
                    code: 401,
                    message: "Unauthorized"
                });
            }
        }
    }
}

//get di tutte le piante
router.get('/api/v1/plants', validateRequests(['user', 'admin']), async (req, res) => {
    db.all('SELECT * FROM garden_plant', (err, rows) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else {
            res.status(200).json(rows);
        }
    });
});

//get di una singola pianta
router.get('/api/v1/plants/:id', validateRequests(['user', 'admin']), (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM garden_plant WHERE plant_id = ?', [id], (err, row) => {
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

//ricerca di tutte le piante che contengono la stringa passata
router.get('/api/v1/plants/research/:name', validateRequests(['user', 'admin']), (req, res) => {
    const name = req.params.name;
    db.all('SELECT * FROM garden_plant WHERE name LIKE ? LIMIT 3', ['%' + name + '%'], (err, rows) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else {
            res.status(200).json(rows);
        }
    });
})

router.post('/api/v1/plants', validateRequests(['admin']), (req, res) => {
    console.log(req.body);
    res.send('ok');
});

router.put('/api/v1/plants/:id', validateRequests(['admin']), (req, res) => {
    const id = req.params.id;
    const plant = req.body;

    db.run('UPDATE garden_plant SET name = ?, description = ? WHERE plant_id = ?', [plant.name, plant.description, id], (err) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        db.get('SELECT * FROM garden_plant WHERE plant_id = ?', [id], (err, row) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            else {
                res.status(200).json(row);
            }
        });
    });
});

router.delete('/api/v1/plants/:id', validateRequests(['admin']), (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM garden_plant WHERE plant_id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
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