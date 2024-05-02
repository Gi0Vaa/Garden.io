const { Router } = require('express');
const jwt = require('jsonwebtoken');

const db = require('../db'); 

const router = Router();

const refreshAccessToken = require('../middlewares/refreshAccessToken');

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

//GREENHOUSE
router.get('/api/v1/greenhouses', validateRequests(['admin']), (req, res) => {
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

router.post('/api/v1/greenhouses', validateRequests(['user', 'admin']), (req, res) => {
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

router.get('/api/v1/greenhouses/:id', validateRequests(['user', 'admin']), (req, res) => {
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

router.put('/api/v1/greenhouses/:id', validateRequests(['user', 'admin']), (req, res) => {
    const id = req.params.id;
    const greenhouse = req.body;

    db.run('UPDATE garden_greenhouse SET name = ?, description = ?, temperature = ?, humidity = ? WHERE greenhouse_id = ?', [greenhouse.name, greenhouse.description, greenhouse.temperature, greenhouse.humidity, id], (err) => {
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
    db.run('DELETE FROM garden_greenhouse WHERE greenhouse_id = ?', [id], (err) => {
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