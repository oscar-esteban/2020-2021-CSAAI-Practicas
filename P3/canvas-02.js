console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 470;
canvas.height = 700;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  JUGANDO: 1,
  FIN: 2,
}
//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Coordenadas del objeto(bola)
let x = 350;
let y = 400;

//-- Velocidades del objeto
let velx = 0;
let vely = 0;

// ladrillos------------------------------------------------------------
const ladrillos = [];
let xLadrillos = 15;
let yLadrillos = 60;
let anchoLadrillos = 40;
let altoLadrillos = 20;
let espacioLadrillos = 10;

for(let i = 0; i < 5; i++){ //FILAS
    ladrillos[i] = []; // inicializamos filas
    for(let j = 0; j < 9; j++){ //COLUMNAS
        ladrillos[i][j] = {
            x: xLadrillos + (anchoLadrillos + espacioLadrillos) * j, //LONGITUD + espacio
            y: yLadrillos + (altoLadrillos + espacioLadrillos) * i,
            W: anchoLadrillos,
            H: altoLadrillos,
            PADDING: espacioLadrillos,
            VISIBLE: true,
            color: 'white'
        };
    }
}

//bola---------------------------------------------------------------------
let xBola = 250;
let yBola = 510;
let xVelocidad = 0;
let yVelocidad = 0;



// funcion dibujar bola
function bola(){
    var imagen = new Image();
    imagen.src = 'bola.jpg'
    ctx.beginPath();
        ctx.arc(xBola, yBola, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = ctx.createPattern(imagen, "repeat");
        //-- Dibujar el trazo
        ctx.stroke()
        //-- Dibujar el relleno
        ctx.fill()
    ctx.closePath();
}

// estado inicial
function inicio(){
    if(estado == ESTADO.INIT){
        xBola = 250;
        yBola = 510;
        xVelocidad = 0;
        yVelocidad = 0;
    }
}

//TECLAS
window.onkeydown = (e) => {
    console.log();
    //-- Según la tecla se hace una cosa u otra
    switch (e.key) {
        case "s":
              if (estado == ESTADO.INIT) {
                console.log("JUGANDO");
                xBola = 250;
                yBola = 510;
          
                //-- Darle velocidad
                xVelocidad = 3;
                yVelocidad = -1;
          
                //-- Cambiar al estado de jugando!
                estado = ESTADO.JUGANDO;
                break;
          
                return false;
              }
            default:
    }
}

function update(){

    console.log("test");
    // estado inicial
    

    if(estado == ESTADO.JUGANDO){
       

        // Rebote vertical
        if (xBola < 10 || xBola >= (canvas.width - 10) ) {
            xVelocidad = -xVelocidad;
        }

        // Rebote horizontal
        if (yBola <= 10 || yBola > (canvas.height - 10)) {
            yVelocidad = -yVelocidad;
            
        }

        // Actualizamos posicion
        xBola = xBola + xVelocidad;
        yBola = yBola + yVelocidad;

       

        // si no golpeo, pierdo
        if(yBola > 685){
            estado = ESTADO.INIT;
        }

    }
    
    // Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   // dibujamos los ladrillos
for(let i = 0; i < 5; i++){
    for(let j = 0; j < 9; j++){
        // si es viisble, se pinta
        if(ladrillos[i][j].VISIBLE){
            ctx.beginPath();
            ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, anchoLadrillos, altoLadrillos);
            ctx.fillStyle = ladrillos[i][j].color;
            ctx.fill();
            ctx.closePath;
        }
    }
}

    inicio();

    // Mi bola
    bola();

    // Volver a ejecutar cuando toque
    requestAnimationFrame(update);

}

// Empezamos funciton
update();