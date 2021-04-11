console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 700;
canvas.height = 500;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUE: 1,
  JUGANDO: 2,
}
//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;




//-- Coordenadas del objeto
let x = 300;
let y = 300;

//-- Velocidades del objeto
let velx = 3;
let vely = 1;

//-- Funcion principal de animacion
function update() 
{
  console.log("test");
  //-- Algoritmo de animacion:
  //-- 1) Actualizar posicion del  elemento
  //-- (física del movimiento rectilineo uniforme)

   //-- Condicion de rebote en extremos verticales del canvas
   if (x < 150 || x >= 530 ) {
    velx = -velx;
  }

  //-- Condición de rebote en extremos horizontales del canvas
  if (y <= 30 || y > 500) {
    vely = -vely;
  }

  //-- Actualizar la posición
  x = x + velx;
  y = y + vely;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    ctx.rect(x, y, 15, 15);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  // LINEAS MAPA
ctx.beginPath();
//-- Líneas verticales
ctx.moveTo(150, 0);
ctx.lineTo(150, 500);
ctx.moveTo(545, 0);
ctx.lineTo(545, 500);

//--linea horizontal
ctx.moveTo(150, 30);
ctx.lineTo(545, 30);


ctx.strokeStyle = 'white';
//-- Cambiar el tamaño de la linea del trazo
ctx.lineWidth = 4;

//-- Dibujar el trazo
ctx.stroke()
ctx.closePath()

// RECTANGULOS
ctx.beginPath();
//-- Definir un rectangulo de dimensiones 25x12,
//-- BUCLE cuya esquina superior izquierda está en (i,j)
for (var j = 40; j <= 120;){
for (var i = 160; i <= 540;) {
    ctx.rect(i,j, 25, 12);
    i += 35; };
j += 20;
};
//-- Color de relleno del rectángulo
ctx.fillStyle = 'white';

//-- Mostrar el relleno
ctx.fill();
//-- Mostrar el trazo del rectángulo
ctx.stroke();
ctx.closePath();

//-- TEXTO
ctx.font = "25px Arial";
ctx.fillStyle = 'white'
ctx.fillText("VIDAS: 2", 10, 30);
ctx.fillText("PUNTOS: 0", 565, 30);

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();



//-- Botón de arranque
const start = document.getElementById("Start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

