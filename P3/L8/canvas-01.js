console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 500;
canvas.height = 500;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

// LINEAS MAPA
ctx.beginPath();
    //-- Líneas verticales
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 500);
    ctx.moveTo(390, 0);
    ctx.lineTo(390, 500);

    ctx.strokeStyle = 'white';
    //-- Cambiar el tamaño de la linea del trazo
    ctx.lineWidth = 4;

    //-- Dibujar el trazo
    ctx.stroke()
ctx.closePath()

// RECTANGULO
ctx.beginPath();
  //-- Definir un rectangulo de dimensiones 25x12,
  //-- BUCLE cuya esquina superior izquierda está en (i,j)
  for (var j = 40; j <= 120;){
    for (var i = 110; i <= 355;) {
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