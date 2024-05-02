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
                res.status(401).json({
                    code: 401,
                    message: "Unauthorized"
                });
            }
        }
    }
}

//plants in a greenhouse
router.get('/api/v1/greenhouses/:greenhouseId/plants', validateRequests(['user', 'admin']), (req, res) => {
    const id = req.params.greenhouseId;
    db.all('SELECT * FROM garden_plant_greenhouse g JOIN garden_plant p ON p.plant_id=g.plant_id  WHERE greenhouse_id = ?', [id], (err, rows) => {
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

router.post('/api/v1/greenhouses/:greenhouseId/plants', validateRequests(['user', 'admin']), (req, res) => {
    const greenhouseId = parseInt(req.params.greenhouseId);
    const plantId = parseInt(req.body.plant_id);
    const quantity = parseInt(req.body.quantity);
    db.run('INSERT INTO garden_plant_greenhouse (greenhouse_id, plant_id, quantity ) VALUES (?, ?, ?)', [ greenhouseId, plantId, quantity ], (err, result, fields) => {
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

router.patch('/api/v1/greenhouses/:greenhouseId/plants/:plantId', validateRequests(['user', 'admin']), (req, res) => {
    const greenhouseId = req.params.greenhouseId;
    const plantId = req.params.plantId;
    const quantity = req.body.quantity;
    db.get('SELECT quantity FROM garden_plant_greenhouse WHERE greenhouse_id = ? AND plant_id = ?', [greenhouseId, plantId], (err, row) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        const newQuantity = row.quantity + quantity;
        db.run('UPDATE garden_plant_greenhouse SET quantity = ? WHERE greenhouse_id = ? AND plant_id = ?', [newQuantity, greenhouseId, plantId], (err, result, fields) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            db.get(`SELECT * 
                    FROM garden_plant_greenhouse g 
                    JOIN garden_plant p ON p.plant_id = g.plant_id 
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

router.delete('/api/v1/greenhouses/:greenhouseId/plants/:plantId', validateRequests(['user', 'admin']), (req, res) => {
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