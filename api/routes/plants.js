const { Router } = require('express');
const con = require('../db');

const router = Router();

//add plant
router.post('/plants', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

//get di tutte le piante
router.get('/plants', async (req, res) => {
    con.query('SELECT * FROM garden_plant', (err, result, fields) => {
        if(err){
            res.status(500).json({
                error: "Query failed"
            });
        }
        res.status(200).json(result);
    });
});

//get di una singola pianta
router.get('/plants/:id', (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM garden_plant WHERE plant_id = ?', [id], (err, result, fields) => {
        if(err){
            res.status(500).json({
                error: "Query failed"
            });
        }
        else if(result.length === 0){
            res.status(404).json({
                code: 404,
                message: "Not found"
            });
        }
        else{
            res.status(200).json(result[0]);
        }
    })
});

router.put('/plants/:id', (req, res) => {
    
}); 

router.delete('/plants/:id', (req, res) => {
    res.send('ok');
});