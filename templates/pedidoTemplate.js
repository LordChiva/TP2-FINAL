//const { CANCELLED } = require('dns');
const fs = require('fs');
const pdf = require('pdfkit');

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

function generarPdf(cantidad, producto, subTotal, total) {
    // creacion de documento PDF
    const doc = new pdf()
    doc.text(encabezado)
    doc.text('\n')
    doc.text(titulo)
    doc.text('\n')
    doc.text('--------------------------------------------------------------------------')
    doc.text('\n')
    doc.text(`Empanada sabor: ${producto}  -- cantidad: ${cantidad}   -- Subotal: $${subTotal}`)
    // --> hacer varias lineas 
    doc.text('\n')
    doc.text('--------------------------------------------------------------------------')
    doc.text('\n')
    doc.text(`Total: $${total}`)
    doc.text('\n')
    doc.text('--------------------------------------------------------------------------')
    doc.text(pie);

    return doc;
}

//function generar(pedido) {  --->  deberia recibir un pedido como parametro
function generar(pedido) {
    //ingresar el item con los parametros:
    /*@params
    @cantidad
    @producto_id
    */

    //let cliente = pedido.cliente_id;
    console.log(pedido);
    //console.log('cliente ' + cliente);
    //buscando el id (getCliente).nombre // y telefono

    //let cantidad = recibe la cantidad del pedido

    //let producto = buscando por id (getProducto).nombre

    //let subTotal = 
    //recibe le subtotal ya calculado o
    //calcular con la funcion async function subTotal(pedido)

    //let total = 
    //recibe el total del pedido
    //calcularlo con la function importeTotal(pedido) 

    let cantidad = 17;
    let producto = 'jyq';
    let subTotal = 200;
    let total = 250;

    let doc = generarPdf(cantidad, producto, subTotal, total);

    //creacion del nombre del archivo - se guarda local 
    //doc.pipe(fs.createWriteStream(`./pedido_${fechaHora_telefono}.pdf`))
    doc.pipe(fs.createWriteStream(`../pedido_${cantidad}_${producto}.pdf`))
    doc.end();
    console.log(`\n****** El pedido ha sido creado con éxito  *********`)
}

//generar();
module.exports = { generar };