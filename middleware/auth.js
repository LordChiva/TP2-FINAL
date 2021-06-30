const jwt = require('jsonwebtoken');
require('dotenv').config();

//Funcion de autenticacion
function auth(req, res, next) {
    try {
        const token = req.header('Token');

        const user = jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}

//Se exporta todo el contenido
module.exports = auth;