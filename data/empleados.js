const connection = require('./connection')
let objectId = require('mongodb').ObjectId;

async function getEmpleados() {
    const clientmongo = await connection.getConnection();
    const empleados = clientmongo.db('sample_tp2')
        .collection('empleados')
        .find()
        .toArray();
    return empleados;
}

async function getEmpleado(id) {
    const clientmongo = await connection.getConnection();
    const empleado = clientmongo.db('sample_tp2')
        .collection('empleados')
        .findOne({ _id: new objectId(id) });
    return empleado;
}

async function addEmpleado(empleado) {
    const clientmongo = await connection.getConnection();
    const result = clientmongo.db('sample_tp2')
        .collection('empleados')
        .insertOne(empleado);
    return result;
}

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

async function deleteEmpleado(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('empleados')
        .deleteOne({ _id: new objectId(id) });
    return result;
}


module.exports = { getEmpleados, getEmpleado, addEmpleado, updateEmpleado, deleteEmpleado };