const connection = require('./connection')
let objectId = require('mongodb').ObjectId;

async function getPedidos() {
    const clientmongo = await connection.getConnection();
    const pedidos = clientmongo.db('sample_tp2')
        .collection('pedidos')
        .find()
        .toArray();
    return pedidos;
}

async function getPedido(id) {
    const clientmongo = await connection.getConnection();
    const pedido = clientmongo.db('sample_tp2')
        .collection('pedidos')
        .findOne({ _id: new objectId(id) });
    return pedido;
}

async function addPedido(pedido) {
    const clientmongo = await connection.getConnection();
    const result = clientmongo.db('sample_tp2')
        .collection('pedidos')
        .insertOne(pedido);
    return result;
}

async function updatePedido(pedido) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new objectId(pedido._id) };
    const newvalues = {
        $set: {
            nro_pedido: pedido.nro_pedido,
            fechahora: pedido.fechahora,
            empleado_id: pedido.empleado_id,
            cliente_id: pedido.cliente_id,
            item_producto: pedido.item_producto,    // ------>

            producto_id: pedido.item_producto.producto_id,
            cantidad: pedido.item_producto.cantidad,
            subTotal: pedido.item_producto.subTotal,

            cantidadTotal: pedido.cantidadTotal,
            total: pedido.total,
        }
    };

    const result = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .updateOne(query, newvalues);
    return result;
}

async function deletePedido(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .deleteOne({ _id: new objectId(id) });
    return result;
}


module.exports = { getPedidos, getPedido, addPedido, updatePedido, deletePedido };