//const { CANCELLED } = require('dns');
const fs = require('fs');
const pdf = require('pdfkit');
const dataProducto = require('../data/productos');
const dataCliente = require('../data/clientes');

//Encabezado
const encabezado = `                      EMPANADapp    
                    Yatay 270 - CABA
                    Telefono: 11111111
        **************************************************`
//titulo del pedido
const titulo = '                                PEDIDO             '
//pie de pagina
const pie = `Recibirá su pedido dentro de los próximos 50 minutos
                
                        ...Gracias por elegirnos`

//function generarPdf(cantidad, producto, subTotal, total) {
async function generarPdf(pedido) {
    // creacion de documento PDF
    const doc = new pdf()
    doc.text(encabezado)
    doc.text('\n')
    doc.text(titulo)
    doc.text('\n')
    doc.text('--------------------------------------------------------------------------')
    doc.text('\n')

    //Hacer un forof  // --> hacer que imprima varias lineas 
    for (const itemProducto of pedido.item_producto) {
        let producto = await dataProducto.getProducto(itemProducto.producto_id);
        doc.text(`Empanada sabor: ${producto.gusto}  -- cantidad: ${itemProducto.cantidad}   -- Subtotal: $${itemProducto.subTotal}`)
    }

    doc.text('\n')
    doc.text('--------------------------------------------------------------------------')
    doc.text('\n')
    doc.text(`Total: $${pedido.total}`)
    doc.text('\n')
    doc.text('--------------------------------------------------------------------------')
    doc.text(pie);
    return doc;
}

//function generar(pedido) {  --->  deberia recibir un pedido como parametro
async function generar(pedido) {
    let fechahora = pedido.fechahora;
    let idCliente = pedido.cliente_id;
    let cliente = await dataCliente.getCliente(idCliente);
    let telefono = cliente.telefono;

    let doc = await generarPdf(pedido);

    //creacion del nombre del archivo - se guarda local 
    //doc.pipe(fs.createWriteStream(`./pedido_${fechaHora_telefono}.pdf`))
    doc.pipe(fs.createWriteStream(`./templates/pedido_${fechahora}_${telefono}.pdf`));
    doc.end();
    console.log(`\n****** El pedido ha sido creado con éxito  *********`)
}

module.exports = { generar };
