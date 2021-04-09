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
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 500);

    ctx.strokeStyle = 'white';
    //-- Cambiar el tamaño de la linea del trazo
    ctx.lineWidth = 4;

    //-- Dibujar el trazo
    ctx.stroke()
ctx.closePath()