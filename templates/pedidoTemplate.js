//const { CANCELLED } = require('dns');
const fs = require('fs');
const pdf = require('pdfkit');
const dataProducto = require('../data/productos');
const dataCliente = require('../data/clientes');

//Encabezado
const encabezado = `EMPANADapp \n Yatay 270 - CABA \n Telefono: 48058255`
//titulo del pedido
const titulo = 'PEDIDO'
//pie de pagina
const pie = `Recibirá su pedido dentro de los próximos 50 minutos
                
                        ...Gracias por elegirnos`

//Generacion del formato del PDF
async function generarPdf(pedido) {
    // creacion de documento PDF
    const doc = new pdf()
    doc.text(encabezado, {align: 'center'})
    doc.text('************************************************', {align: 'center'})
    doc.text(titulo, {align: 'center'})
    doc.text('\n')


    let idCliente = pedido.cliente_id;
    let cliente = await dataCliente.getCliente(idCliente);

    doc.text(`${cliente.nombre} ${cliente.apellido}    -     ${cliente.telefono}`, {align: 'center'});
    doc.text(`${cliente.direccion}`, {align: 'center'});

    doc.text('--------------------------------------------------------------------------------------------------------------------')
    doc.text('\n')
    doc.text('SABOR                             PRECIO                        CANT                     SUBTOTAL  ', {align: 'right'})
    doc.text('\n')

    for (const itemProducto of pedido.item_producto) {
        let producto = await dataProducto.getProducto(itemProducto.producto_id);
        doc.text(`${producto.gusto}                                 ${producto.precio}                                 ${itemProducto.cantidad}                                 $ ${itemProducto.subTotal}`, {align: 'right'})
    }
    doc.text('\n')
    doc.text('--------------------------------------------------------------------------------------------------------------------')
    doc.text('\n')
    doc.text(`Total: $${pedido.total}`,{align: 'right'})
    doc.text('\n')
    doc.text('--------------------------------------------------------------------------------------------------------------------')
    
    doc.text(pie)
    return doc;
}

//function generar(pedido) {  --->  deberia recibir un pedido como parametro
async function generar(pedido) {
    let fechahora = pedido.fechahora; // debe guardarse de la siguiente manera: AAAA-MM-DD
    let idCliente = pedido.cliente_id;
    let cliente = await dataCliente.getCliente(idCliente);
    let telefono = cliente.telefono;
    let doc = await generarPdf(pedido);
    //creacion del nombre del archivo - se guarda local 
    doc.pipe(fs.createWriteStream(`./templates/PDFs/pedido_${fechahora}_${telefono}.pdf`));
    doc.end();
    console.log(`\n****** El pedido ha sido creado con éxito  *********`)
}

//Se exporta la funcion generar
module.exports = { generar };
