const { CANCELLED } = require('dns');
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

//ingresar el item con los parametros:
/*@params
@cantidad
@producto_id
*/

//Valores para imprimir: // ${ }
//let cliente = 
//buscando el id (getCliente).nombre // y telefono

//let cantidad = recibe la cantidad del pedido

//let producto = buscando por id (getProducto).nombre

//let subTotal = 
//recibe le subtotal ya calculado o
//calcular con la funcion async function subTotal(pedido)

//let total = 
//recibe el total del pedido
//calcularlo con la function importeTotal(pedido) 

let cantidad = 4;
let producto = 'jyq';
let subTotal = 200;
let total = 250;

function generarPdf(cantidad, producto, subTotal, total) {

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
}

// creacion de documento PDF
const doc = new pdf()

//creacion del nombre del archivo
//se guarda local - ver si es la descargar
//doc.pipe(fs.createWriteStream(`./pedido_${fechaHora_telefono}.pdf`))
doc.pipe(fs.createWriteStream(`./pedido_${cantidad}_${producto}.pdf`))

console.log(`\n****** El pedido ha sido creado con éxito  *********`)

generarPdf(cantidad, producto, subTotal, total);

doc.end();