const jwt = require('jsonwebtoken');
const db = require('../db.js');

const isAuthenticated = (requiredRole) => {
    return (req, res, next) => {
        const { authorization } = req.headers;
        const accessToken = authorization.substring('Bearer '.length);
        try{
            const { exp, iss, role } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if(iss === "api.greenhortus.life" && exp < Date.now() && requiredRole.includes(role)){
                next();
            }
            else{
                return res.status(401).json({
                    code: 401,
                    message: "Unauthorized"
                });
            }
        }
        catch(err){
            return res.status(401).json({
                code: 401,
                message: "Unauthorized"
            });
        }
    }
}

module.exports = { isAuthenticated };