const connection = require('./connection')
let objectId = require('mongodb').ObjectId;

async function getClientes() {
    const clientmongo = await connection.getConnection();
    const clientes = clientmongo.db('sample_tp2')
        .collection('clientes')
        .find()
        .toArray();
    return clientes;
}

async function getCliente(id) {
    const clientmongo = await connection.getConnection();
    const cliente = clientmongo.db('sample_tp2')
        .collection('clientes')
        .findOne({ _id: new objectId(id) });
    return cliente;
}

async function addCliente(cliente) {
    const clientmongo = await connection.getConnection();
    const result = clientmongo.db('sample_tp2')
        .collection('clientes')
        .insertOne(cliente);
    return result;
}

async function updateCliente(cliente) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new objectId(cliente._id) };
    const newvalues = {
        $set: {
            nro_cliente: cliente.nro_cliente,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            email: cliente.email,
            direccion: cliente.direccion,
        }
    };

    const result = await clientmongo.db('sample_tp2')
        .collection('clientes')
        .updateOne(query, newvalues);
    return result;
}

async function deleteCliente(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('clientes')
        .deleteOne({ _id: new objectId(id) });
    return result;
}


module.exports = { getClientes, getCliente, addCliente, updateCliente, deleteCliente };