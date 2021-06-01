const connection = require('./connection')
let objectId = require('mongodb').ObjectId;

async function getProductos() {
    const clientmongo = await connection.getConnection();
    const productos = clientmongo.db('sample_tp2')
        .collection('productos')
        .find()
        .toArray();
    return productos;
}

async function getProducto(id) {
    const clientmongo = await connection.getConnection();
    const producto = clientmongo.db('sample_tp2')
        .collection('productos')
        .findOne({ _id: new objectId(id) });
    return producto;
}

async function addProducto(producto) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('productos')
        .insertOne(producto);
    return result;
}

async function updateProducto(producto) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new objectId(producto._id) };
    const newvalues = {
        $set: {
            nro_producto: producto.nro_producto,
            gusto: producto.gusto,
            precio: producto.precio,
        }
    };

    const result = await clientmongo.db('sample_tp2')
        .collection('productos')
        .updateOne(query, newvalues);
    return result;
}

async function deleteProducto(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('productos')
        .deleteOne({ _id: new objectId(id) });
    return result;
}


module.exports = { getProductos, getProducto, addProducto, updateProducto, deleteProducto };