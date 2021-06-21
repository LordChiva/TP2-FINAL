import fs from 'fs'
import pdf from 'pdfkit'


//Titulo
const titulo = '            **   CENTRO MEDICO   **             '

// //Incorporacion de las indicaciones medicas 
const textoIntro = 'Indicaciones: medicacion....\n'

//Valores de los datos personales

let nombrePaciente = 'fabian'
let dni = '11111111'
let telefono = '55555555'

//funciones para setear datos
function asignarNombre(nombre) {
    nombrePaciente = nombre
}

function asignarDni(docu) {
    dni = docu;
}

function asignarTel(te) {
    telefono = te;
}

function asignarDatos(nombre, docu, tel) {
    asignarNombre(nombre)
    asignarDni(docu)
    asignarTel(tel)
}

// Formato de Datos Personales
const formatoDatos = `NOMBRE: ${nombrePaciente} 
DNI: ${dni}
TE: ${telefono}
`

//funcion para imprimir indicaciones
function imprimir(indic) {
    doc1.text(titulo)
    doc1.text('\n')
    doc1.text('\n')
    doc1.text('--------------------------------------------------------------------------')
    doc1.text('\n')
    doc1.text(formatoDatos)
    doc1.text('\n')
    doc1.text('--------------------------------------------------------------------------')
    doc1.text('\n')
    doc1.text('\n')
    doc1.text(textoIntro + indic);
}

//funcion para imprimir toda la informacion
function imprimirCompleto(nombre, docu, tel, indic) {
    asignarDatos(nombre, docu, tel)
    doc1.text(titulo)
    doc1.text('\n')
    doc1.text('\n')
    doc1.text('--------------------------------------------------------------------------')
    doc1.text('\n')
    doc1.text(formatoDatos)
    doc1.text('\n')
    doc1.text('--------------------------------------------------------------------------')
    doc1.text('\n')
    doc1.text('\n')
    doc1.text(textoIntro + indic);
}

//************************************************************************************
//Llamadas a las funciones:
//-------------------------

asignarDatos('Mart', '11445965', '33')

// creacion de documento PDF
const doc1 = new pdf()

//creacion del nombre del archivo
doc1.pipe(fs.createWriteStream(`./receta_${dni}.pdf`))

//ingresar indicaciones
imprimir('reposo por 48hs. y volver a consultar');

//ingresar datos del paciente y las indicaciones 
//imprimirCompleto('Lolo', '6666666666', '1523236969', 'reposo por 96hs. y volver a consultar');


//********************************************************************************** */
console.log(`\n****** La receta ha sido creada con éxito  *********`)

doc1.end();
