var d = document.getElementById ("pizarra");
var borrar = document.getElementById ("botonBorrar");

var ancho = d.width;
var lienzo = d.getContext("2d");

let miCanvas = document.querySelector('#pizarra');
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;
// Marca el nuevo punto
let nuevaPosicionX = 0;
let nuevaPosicionY = 0;

let posicion = miCanvas.getBoundingClientRect()
correccionX = posicion.x;
correccionY = posicion.y;

miCanvas.width = 700;
miCanvas.height = 700;

function borrado() {
  console.log("ingrese a borrar");
  lineas = [];
  correccionX = 0;
  correccionY = 0;
  pintarLinea = false;
  // Marca el nuevo punto
  nuevaPosicionX = 0;
 nuevaPosicionY = 0;

   posicion = miCanvas.getBoundingClientRect()
  correccionX = posicion.x;
  correccionY = posicion.y;

  miCanvas.width = 700;
  miCanvas.height = 700;


}

function empezarDibujo() {
    pintarLinea = true;
    lineas.push([]);
};

function guardarLinea() {
    lineas[lineas.length - 1].push({
        x: nuevaPosicionX,
        y: nuevaPosicionY
    });
}

function dibujarLinea(event) {
    event.preventDefault();
    if (pintarLinea) {
        let ctx = miCanvas.getContext('2d')
        // Estilos de linea
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.lineWidth = 10;
        // Color de la linea
        ctx.strokeStyle = '#fff';
        // Marca el nuevo punto
        if (event.changedTouches == undefined) {
            // Versión ratón
            nuevaPosicionX = event.layerX;
            nuevaPosicionY = event.layerY;
        } else {
            // Versión touch, pantalla tactil
            nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
            nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
        }
        // Guarda la linea
        guardarLinea();
        // Redibuja todas las lineas guardadas
        ctx.beginPath();
        lineas.forEach(function (segmento) {
            ctx.moveTo(segmento[0].x, segmento[0].y);
            segmento.forEach(function (punto, index) {
                ctx.lineTo(punto.x, punto.y);
            });
        });
        ctx.stroke();
    }
}

function pararDibujar () {
    pintarLinea = false;
    guardarLinea();
}

miCanvas.addEventListener('mousedown', empezarDibujo, false);
miCanvas.addEventListener('mousemove', dibujarLinea, false);
miCanvas.addEventListener('mouseup', pararDibujar, false);
miCanvas.addEventListener('touchstart', empezarDibujo, false);
miCanvas.addEventListener('touchmove', dibujarLinea, false);
borrar.addEventListener('click', borrado, false);
