const connection = require('./connection')
let objectId = require('mongodb').ObjectId;

//Devuelve todos los clientes de la BD
async function getClientes() {
    const clientmongo = await connection.getConnection();
    const clientes = await clientmongo.db('sample_tp2')
        .collection('clientes')
        .find()
        .toArray();
    return clientes;
}

//Devuelve un cliente de la BD, enviandole el id del cliente como parametro
async function getCliente(id) {
    const clientmongo = await connection.getConnection();
    const cliente = await clientmongo.db('sample_tp2')
        .collection('clientes')
        .findOne({ _id: new objectId(id) });
    return cliente;
}

//Agrega un cliente y lo persiste en la BD
async function addCliente(cliente) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('clientes')
        .insertOne(cliente);
    return result;
}

//Actualiza un cliente determinado en la BD
async function updateCliente(cliente) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new objectId(cliente._id) };
    const newvalues = {
        $set: {
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            email: cliente.email,
            direccion: cliente.direccion,
        }
    };
    const result = await clientmongo.db('sample_tp2')
        .collection('clientes')
        .updateOne(query, newvalues);
    return result;
}

//Borra un cliente determinado enviando su id como parametro
async function deleteCliente(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('clientes')
        .deleteOne({ _id: new objectId(id) });
    return result;
}

//Todos los metodos que se exportan
module.exports = { getClientes, getCliente, addCliente, updateCliente, deleteCliente };