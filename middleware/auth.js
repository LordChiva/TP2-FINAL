const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.header('Token');

        const user = jwt.verify(token, 'ultrasecreta');
        next();
    } catch (error) {
        res.status(401).send({ error: error.message });

    }
}
module.exports = auth;