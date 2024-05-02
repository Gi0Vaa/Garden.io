const { Router } = require('express');
const jwt = require('jsonwebtoken');

const db = require('../db');
const refreshAccessToken = require('../middlewares/refreshAccessToken');

const router = Router();

const validateRequests = (requiredRoles) => {
    return (req, res, next) => {
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

//garden_sensor , garden_sensor_data 

//garden_sensor --> sensor_id, greenhouse_id , type, position --> serve per sapere dove è posizionato il sensore
//garden_sensor_data --> sensor_id, type, value, timestamp --> serve per sapere i dati del sensore
//get di tutti i sensori 
router.get('/api/v1/sensors', validateRequests(['user', 'admin']), async (req, res) => {
    db.all('SELECT * FROM garden_sensor', (err, rows) => {
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


//get di un singolo sensore
router.get('/api/v1/sensors/:id', validateRequests(['user', 'admin']), (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM garden_sensor WHERE sensor_id = ?', [id], (err, row) => {
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

//get di tutti i dati di un sensore
router.get('/api/v1/sensors/:id/data', validateRequests(['user', 'admin']), (req, res) => {
    const id = req.params.id;
    db.all('SELECT * FROM garden_sensor_data WHERE sensor_id = ?', [id], (err, rows) => {
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

//get di un singolo dato di un sensore
router.get('/api/v1/sensors/:id/data/:data_id', validateRequests(['user', 'admin']), (req, res) => {
    const id = req.params.id;
    const data_id = req.params.data_id;
    db.get('SELECT * FROM garden_sensor_data WHERE sensor_id = ? AND data_id = ?', [id, data_id], (err, row) => {
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


//post di un sensore
router.post('/api/v1/sensors', validateRequests(['admin']), (req, res) => {
    const { greenhouse_id, type, position } = req.body;
    db.run('INSERT INTO garden_sensor (greenhouse_id, type, position) VALUES (?, ?, ?)', [greenhouse_id, type, position], (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else {
            res.status(201).json({
                code: 201,
                message: "Created"
            });
        }
    });
});

//post di un dato di un sensore
router.post('/api/v1/sensors/:id/data', validateRequests(['admin']), (req, res) => {
    const id = req.params.id;
    const { type, value, timestamp } = req.body;
    db.run('INSERT INTO garden_sensor_data (sensor_id, type, value, timestamp) VALUES (?, ?, ?, ?)', [id, type, value, timestamp], (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        else {
            res.status(201).json({
                code: 201,
                message: "Created"
            });
        }
    });
});

//put di un sensore
router.put('/api/v1/sensors/:id', validateRequests(['admin']), (req, res) => {
    const id = req.params.id;
    const sensor = req.body;

    db.run('UPDATE garden_sensor SET greenhouse_id = ?, type = ?, position = ? WHERE sensor_id = ?', [sensor.greenhouse_id, sensor.type, sensor.position, id], (err) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        db.get('SELECT * FROM garden_sensor WHERE sensor_id = ?', [id], (err, row) => {
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

//put di un dato di un sensore
router.put('/api/v1/sensors/:id/data/:data_id', validateRequests(['admin']), (req, res) => {
    const id = req.params.id;
    const data_id = req.params.data_id;
    const data = req.body;

    db.run('UPDATE garden_sensor_data SET type = ?, value = ?, timestamp = ? WHERE sensor_id = ? AND data_id = ?', [data.type, data.value, data.timestamp, id, data_id], (err) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        db.get('SELECT * FROM garden_sensor_data WHERE sensor_id = ? AND data_id = ?', [id, data_id], (err, row) => {
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

//delete di un sensore
router.delete('/api/v1/sensors/:id', validateRequests(['admin']), (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM garden_sensor WHERE sensor_id = ?', [id], (err) => {
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

//delete di un dato di un sensore
router.delete('/api/v1/sensors/:id/data/:data_id', validateRequests(['admin']), (req, res) => {
    const id = req.params.id;
    const data_id = req.params.data_id;
    db.run('DELETE FROM garden_sensor_data WHERE sensor_id = ? AND data_id = ?', [id, data_id], (err) => {
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