const connection = require('./connection')
let objectId = require('mongodb').ObjectId;

//Devuelve todos los productos de la BD
async function getProductos() {
    const clientmongo = await connection.getConnection();
    const productos = await clientmongo.db('sample_tp2')
        .collection('productos')
        .find()
        .toArray();
    return productos;
}

//Devuelve un producto de la BD, enviandole el id del producto como parametro
async function getProducto(id) {
    const clientmongo = await connection.getConnection();
    const producto = await clientmongo.db('sample_tp2')
        .collection('productos')
        .findOne({ _id: new objectId(id) });
    return producto;
}

//Agrega un producto y lo persiste en la BD
async function addProducto(producto) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('productos')
        .insertOne(producto);
    return result;
}

//Actualiza un producto determinado en la BD
async function updateProducto(producto) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new objectId(producto._id) };
    const newvalues = {
        $set: {
            cod: producto.cod,
            gusto: producto.gusto,
            precio: producto.precio,
        }
    };
    const result = await clientmongo.db('sample_tp2')
        .collection('productos')
        .updateOne(query, newvalues);
    return result;
}

//Borra un producto determinado enviando su id como parametro
async function deleteProducto(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('productos')
        .deleteOne({ _id: new objectId(id) });
    return result;
}

//Todos los metodos que se exportan
module.exports = { getProductos, getProducto, addProducto, updateProducto, deleteProducto };