const { Router } = require('express');

const isLogged = require('../middleware/isLogged');
const users = require('../services/db/users');

const router = Router();

router.get('/api/users/research/:name', isLogged, async (req, res) => {
    const name = req.params.name;
    const usersData = await users.getUsersByName(name);
    if(!usersData){
        return res.status(404).json({
            code: 404,
            message: "No users found"
        });
    }
    else{
        return res.status(200).json(usersData);
    }
});

module.exports = router;