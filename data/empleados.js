const connection = require('./connection')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let objectId = require('mongodb').ObjectId;
require('dotenv').config();

//Devuelve todos los empleados de la BD
async function getEmpleados() {
    const clientmongo = await connection.getConnection();
    const empleados = await clientmongo.db('sample_tp2')
        .collection('empleados')
        .find()
        .toArray();
    return empleados;
}

//Devuelve un empleado de la BD, enviandole el id del empleado como parametro
async function getEmpleado(id) {
    const clientmongo = await connection.getConnection();
    const empleado = await clientmongo.db('sample_tp2')
        .collection('empleados')
        .findOne({ _id: new objectId(id) });
    return empleado;
}

//Agrega un empleado y lo persiste en la BD
async function addEmpleado(empleado) {
    const clientmongo = await connection.getConnection();
    empleado.password = await bcrypt.hash(empleado.password, 8)

    const result = await clientmongo.db('sample_tp2')
        .collection('empleados')
        .insertOne(empleado);
    return result;
}

//Actualiza un empleado determinado en la BD
async function updateEmpleado(empleado) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new objectId(empleado._id) };
    const newvalues = {
        $set: {
            legajo: empleado.legajo,
            nombre: empleado.nombre,
            password: empleado.password,
        }
    };
    const result = await clientmongo.db('sample_tp2')
        .collection('empleados')
        .updateOne(query, newvalues);
    return result;
}

//Borra un empleado determinado enviando su id como parametro
async function deleteEmpleado(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('empleados')
        .deleteOne({ _id: new objectId(id) });
    return result;
}

//Validar las credenciales del empleado para el acceso
async function findByCredentials(legajo, password) {
    const clientmongo = await connection.getConnection();
    const empleado = await clientmongo.db('sample_tp2')
        .collection('empleados')
        .findOne({ legajo: legajo });
    if (!empleado) {
        throw new Error('Credenciales no válidas');
    }
    const isMatch = bcrypt.compare(password, empleado.password);
    if (!isMatch) {
        throw new Error('Credenciales no válidas');
    }
    return empleado;
}

//Genera el token de autenticacion
function generateAuthToken(empleado) {
    const token = jwt.sign({ _id: empleado._id }, process.env.SECRET, { expiresIn: '2h' });
    return token;
}

//Todos los metodos que se exportan
module.exports = { getEmpleados, getEmpleado, addEmpleado, updateEmpleado, deleteEmpleado, findByCredentials, generateAuthToken };