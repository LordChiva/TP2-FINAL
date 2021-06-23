function resultadoOperacion(datoUno, datoDos) {

    //opcion 1: recibienddo los valores por parametro y parsearlos
    //let numUno = parseInt(datoUno);
    //let numDos = parseInt(datoDos);

    //Opcion 2: tomando los datos desde los ids de html y se parsean
    let numUno = parseInt(document.getElementById("item").value);
    let numDos = parseInt(document.getElementById("item").value);

    //operacion de suma o multiplicacion
    let resultado = numUno + numDos;
    document.getElementById("resultado").value = resultado;
}

function incrementar() {
    let numUno = parseInt(document.getElementById("cant1").value);
    numUno++;
    document.getElementById("cant1").value = numUno;
}

function restar() {
    let numUno = parseInt(document.getElementById("cant1").value);
    numUno--;
    document.getElementById("cant1").value = numUno;
}

function comparacion() {
    let numUno = parseInt(document.getElementById("numUno").value);
    let numDos = parseInt(document.getElementById("numDos").value);
    let respuesta = numUno == numDos ? "Iguales" : "Diferentes";
    document.getElementById("resultado").value = respuesta;

}