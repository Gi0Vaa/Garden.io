const { Router } = require('express');
const con = require('../db');

const router = Router();




//GREENHOUSE USERS
router.get('/greenhouses/users/:email', (req, res) => {
    const email = req.params.email;
    con.query('SELECT * FROM garden_personal_greenhouse WHERE email = ?', [email], (err, result, fields) => {
        if(err){
            res.status(500).json({
                code: 500,
                message: "Query failed"
            });
        }
        if(result.length === 0){
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        res.status(200).json(result);
    });
});