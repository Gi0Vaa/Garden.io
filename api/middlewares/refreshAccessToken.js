const jwt = require('jsonwebtoken');
const db = require('../db.js');

function refreshAccessToken(req, res, next) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken && !refreshToken) {
        return res.status(401).json({
            code: 401,
            message: "Unauthorized"
        });
    }
    else{
        const email = jwt.decode(refreshToken).email;
        db.get('SELECT * FROM garden_user WHERE email = ?', [email], (err, row) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: "Query failed"
                });
            }
            if (!row) {
                return res.status(401).json({
                    code: 401,
                    message: "Unauthorized"
                });
            }
            else{
                const newAccessToken = jwt.sign({ email: row.email, role: row.role }, process.env.JWT_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: '1h',
                    issuer: 'garden.io',
                    subject: row.email
                });
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true
                });
                db.run('UPDATE garden_user SET token = ? WHERE email = ?', [newAccessToken, row.email]);
                next();
            }
        });
    }

}

module.exports = refreshAccessToken;