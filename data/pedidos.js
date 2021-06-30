const connection = require('./connection')
let objectId = require('mongodb').ObjectId;
let dataProducto = require('../data/productos');
let templatePedido = require('../templates/pedidoTemplate');

//Devuelve todos los pedidos de la BD
async function getPedidos() {
    const clientmongo = await connection.getConnection();
    const pedidos = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .find()
        .toArray();
    return pedidos;
}

//Devuelve un pedido de la BD, enviandole el id del pedido como parametro
async function getPedido(id) {
    const clientmongo = await connection.getConnection();
    const pedido = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .findOne({ _id: new objectId(id) });
    return pedido;
}

//Agrega un pedido y lo persiste en la BD
async function addPedido(pedido) {
    pedido = fechaYHoraActual(pedido);
    pedido = cantidadTotal(pedido);
    pedido = await subTotal(pedido);
    pedido = importeTotal(pedido);
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .insertOne(pedido);
    return result;
}

//Actualiza un pedido determinado en la BD
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

//Borra un pedido determinado enviando su id como parametro
async function deletePedido(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('sample_tp2')
        .collection('pedidos')
        .deleteOne({ _id: new objectId(id) });
    return result;
}

//Establece la cantidad total de productos y devuelve el pedido con el valor establecido
function cantidadTotal(pedido) {
    let sumaTotal = 0;
    for (const itemProducto of pedido.item_producto) { //itemProducto x producto
        sumaTotal = sumaTotal + itemProducto.cantidad;
    }
    pedido.cantidadTotal = sumaTotal;
    return pedido;
}

//Establece el importe total de productos y devuelve el pedido con el valor establecido
function importeTotal(pedido) {
    let suma = 0;
    for (const itemProducto of pedido.item_producto) {
        suma = suma + itemProducto.subTotal;
    }
    pedido.total = suma;
    return pedido;
}

//Establece el importe subtotal de itemProducto y devuelve el pedido con el valor establecido
async function subTotal(pedido) {
    let sumaSubTotal = 0;
    for (const itemProducto of pedido.item_producto) {
        let producto = await dataProducto.getProducto(itemProducto.producto_id);
        //console.log(producto.precio);
        sumaSubTotal = itemProducto.cantidad * producto.precio;
        //console.log(sumaSubTotal);
        itemProducto.subTotal = sumaSubTotal;
    }
    return pedido;
}

//Establece la fecha y hora exacta en la que se agrega un pedido
//Ejemplo del último pedido que hice:
//La fecha del último pedido es 30/06/2021, diaMesAnio lo traera así: 3062021
//La hora del último pedido es 06:13:42 (formato 24hs), hora lo traera así: 61342
//pedido.fechahora queda así: 3062021_61342
function fechaYHoraActual(pedido) {
    let fecha = new Date();
    let diaMesAnio = fecha.getDate() + '' + (fecha.getMonth() + 1) + '' + fecha.getFullYear();
    let hora = fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();
    pedido.fechahora = diaMesAnio + '_' + hora;
    return pedido;
}

//Todos los metodos que se exportan
module.exports = { getPedidos, getPedido, addPedido, updatePedido, deletePedido };