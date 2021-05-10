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
let yBola = 560;
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

//bloque---------------------------------------------------------------------
let xBloque = 210;
let yBloque = 575;

function bloque(){
    ctx.beginPath();
        ctx.rect(xBloque,yBloque, 80, 20);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
    ctx.closePath();
}

// estado inicial
function inicio(){
    if(estado == ESTADO.INIT){
        xBola = 250;
        yBola = 560;
        xVelocidad = 0;
        yVelocidad = 0;
    }
}
//---------------------------------------------------------------------------
function pop(){
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 9; j++){
            if(xBola >= ladrillos[i][j].x && xBola <= (ladrillos[i][j].x+40+10) && yBola >= ladrillos[i][j].y && yBola <= (ladrillos[i][j].y)+20+10 && ladrillos[i][j].VISIBLE){
                ladrillos[i][j].VISIBLE = false;
                yVelocidad = -yVelocidad;
                puntoss += 10;
               
            }
        }
    }  
}
//Tiempo--------------------------------------------------------------------
let microsegundos = 0;
let segundos = 0;
let minutos = 0;

function time(){
    if (estado == ESTADO.JUGANDO) {
        microsegundos ++;
        if(microsegundos === 100){
            microsegundos = 0;
            segundos ++;
            if(segundos < 10){
                segundos = '0' + segundos;
            }
        }
        if(segundos == 60){
            minutos ++;
            segundos = 0;
            if(minutos < 10){
                minutos = "0" + minutos;
            }
            if(segundos == 0){
                segundos = "0" + segundos;
            }
        }
    }
}
function cronometro(){
    ctx.font = "25px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText('Tiempo: ', 20, 40);
    ctx.fillText(minutos + ':' + segundos, 130, 42);
}
//VIDAS-------------------------------------------------------------------
let vidass = 3;
function vidas(){
    ctx.font = "25px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText('Vidas: ', 300, 680);
    for (var i = 0; i <= vidass - 1;) {
        ctx.fillText('O', 380 + (i*30), 682);
        i += 1;
    }
}
//PUNTOS-------------------------------------------------------------------
let puntoss = 0;
function puntos(){
    ctx.font = "25px arial";
    ctx.fillStyle = 'white';
    ctx.fillText('Puntos: ', 300, 40);
    ctx.fillText(puntoss, 420, 42);
}
//FIN---------------------------------------------------------------------
function fin(){
    if(vidass == 0){
        estado = ESTADO.FIN;
        ctx.font = "50px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText('FIN DEL JUEGO', 50, 400);
        ctx.font = "20px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText('Has conseguido: ' + puntoss + ' puntos.', 100, 470);
    }
}

//Victoria---------------------------------------------------------------------
function victoria(){
    if(puntoss == 450){
        estado = ESTADO.FIN;
        ctx.font = "50px Arial";
        ctx.fillStyle = 'green';
        ctx.fillText('¡¡HAS GANADO!!', 50, 400);
        ctx.font = "20px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText('Tu tiempo:   ' + minutos + ' minutos y ' + segundos + ' segundos.', 90, 470);
    }
}
//INFO----------------------------------------------------------------------
function info(){
    if(estado == ESTADO.INIT && puntoss == 0){
        ctx.font = "20px Arial";
            ctx.fillStyle = 'white';
            ctx.fillText('-Bienvenido a Pong.', 70, 300);
            ctx.fillText('-Elimina todos los bloques para ganar.', 70, 330);
            ctx.fillText('-Para moverte hacia la izquierda usa ",".', 70, 360);
            ctx.fillText('-Para moverte hacia la derecha usa ".".', 70, 390);
            ctx.fillText('-Pulsa "Espacio" para empezar a jugar.', 70, 420);
    }
}
//TECLAS-------------------------------------------------------------------
window.onkeydown = (e) => {
    console.log();
    //-- Según la tecla se hace una cosa u otra
    switch (e.key) {
        case " ":
              if (estado == ESTADO.INIT) {
                console.log("JUGANDO");
                xBola = 250;
                yBola = 560;
          
                //-- Darle velocidad
                xVelocidad = 3;
                yVelocidad = -2;
          
                //-- Cambiar al estado de jugando!
                estado = ESTADO.JUGANDO;
                break;
          
              }
        case ".": // derecha
            xBloque = xBloque + 10;
            if(xBloque > 390){
                xBloque = 390;
            }
            break;
        case ",": //izquierda
            xBloque = xBloque - 10; 
            if(xBloque < 0){
                xBloque = 0;
            }
        default:
    }
}

function update(){

    console.log("test");
    // estado inicial
    inicio();

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
            vidass -= 1;
        }
         // Choque con mi bloque
         if(xBola >= xBloque && xBola < (xBloque+80+10) && yBola >= (yBloque-10) && yBola < (yBloque+20+10)){
            yVelocidad = -yVelocidad;
        }
       pop();

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

    //info
    info();

    // Mi bloque
    bloque();

    // Mi bola
    bola();

    //vidas
    vidas();

    //puntos
    puntos();

    //fin
    fin();

    //Victoria
    victoria();

    //tiempo
    time();
    cronometro();

    // Volver a ejecutar cuando toque
    requestAnimationFrame(update);

}

// Empezamos funciton
update();