const connection = require('./connection')
let objectId = require('mongodb').ObjectId;
let dataProducto = require('../data/productos');
let templatePedido = require('../templates/pedidoTemplate');

async function getPedidos() {
    const clientmongo = await connection.getConnection();
    const pedidos = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .find()
        .toArray();
    return pedidos;
}

async function getPedido(id) {
    const clientmongo = await connection.getConnection();
    const pedido = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .findOne({ _id: new objectId(id) });
    return pedido;
}

async function addPedido(pedido) {
    pedido = cantidadTotal(pedido);
    pedido = await subTotal(pedido);
    pedido = importeTotal(pedido);
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .insertOne(pedido);
    return result;
}

async function updatePedido(pedido) {
    pedido = cantidadTotal(pedido);
    pedido = await subTotal(pedido);
    pedido = importeTotal(pedido);
    const clientmongo = await connection.getConnection();
    const query = { _id: new objectId(pedido._id) };
    const newvalues = {
        $set: {
            fechahora: pedido.fechahora,
            empleado_id: pedido.empleado_id,
            cliente_id: pedido.cliente_id,
            item_producto: pedido.item_producto,
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

function cantidadTotal(pedido) {
    let sumaTotal = 0;
    for (const itemProducto of pedido.item_producto) { //itemProducto x producto
        sumaTotal = sumaTotal + itemProducto.cantidad;
    }
    pedido.cantidadTotal = sumaTotal;
    return pedido;
}

function importeTotal(pedido) {
    let suma = 0;
    for (const itemProducto of pedido.item_producto) {
        suma = suma + itemProducto.subTotal;
    }
    pedido.total = suma;
    return pedido;
}

async function subTotal(pedido) {
    let sumaSubTotal = 0;

    for (const itemProducto of pedido.item_producto) {
        let producto = await dataProducto.getProducto(itemProducto.producto_id);
        console.log(producto.precio);
        sumaSubTotal = itemProducto.cantidad * producto.precio;
        console.log(sumaSubTotal);
        itemProducto.subTotal = sumaSubTotal;
    }
    return pedido;
}

module.exports = { getPedidos, getPedido, addPedido, updatePedido, deletePedido };