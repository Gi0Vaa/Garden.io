const { Router } = require('express');
const con = require('../db/connection.js');

const router = Router();


//GREENHOUSE USERS
router.get('/mapgreenhouses/:email', (req, res) => {
    const email = req.params.email;
    con.query('SELECT * FROM garden_personal_greenhouse WHERE email = ?', [email], (err, result, fields) => {
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


module.exports = router;