console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 700;
canvas.height = 500;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

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
ctx.fillText("PUNTOS: 0", 555, 30);