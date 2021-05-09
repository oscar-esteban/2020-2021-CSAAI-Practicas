console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 500;
canvas.height = 800;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

// Coordenadas
let X_bloque = 210;
let Y_bloque = 760;
let X_bola = 250;
let Y_bola = 720;

// Velocidades
let velocidad_X = 4.5;
let velocidad_Y = -2;

// para mover bloque
var evento = window.event;

// estados
const ESTADO = {
    INIT : 0,
    BEGIN : 1,
    JUEGO : 2,
    FIN: 3,
}
    let estado = ESTADO.INIT;

// puntos
let puntos = 0;

// vidas
let vidas = 3;

// timepo
let microsegundos = 0;
let segundos = 0;
let minutos = 0;

// sonidos
const destruir = new Audio("plop.mp3");
const rebote = new Audio("raqueta.mp3");

// ladrillos
let X_inicio = 14;
let Y_inicio = 80;

var color1 = 'rgb(102, 221, 150)'; // amarillo
var color2 = 'rgb(215, 102, 221)'; // rosa
var color3 = 'rgb(241, 234, 96)'; // verde
var color4 = 'rgb(96, 114, 241)'; // azul
var A_colores = [color1,color2,color3,color4]

const LADRILLO = {
    FILA: 5,
    COLUMNA: 9,
    W: 35, //ancho
    H: 30, // alto
    PADDING: 20, // espacio alrededor del ladrillo
    VISIBLE: true // estado del ladrillo
}
const ladrillos = [];

// ladrillos
for(let i = 0; i < LADRILLO.FILA; i++){
    ladrillos[i] = []; // inicializamos filas
    for(let j = 0; j < LADRILLO.COLUMNA; j++){
        ladrillos[i][j] = {
            x: X_inicio + (LADRILLO.W + LADRILLO.PADDING) * j,
            y: Y_inicio + (LADRILLO.H + LADRILLO.PADDING) * i,
            W: LADRILLO.W,
            H: LADRILLO.H,
            PADDING: LADRILLO.PADDING,
            VISIBLE: LADRILLO.VISIBLE,
            color: A_colores[Math.floor(Math.random()*4)]
            
        };
    }
}

// funcion dibujar bloque
function bloque(){
    ctx.beginPath();
        ctx.rect(X_bloque,Y_bloque, 80, 20);
        //-- Color de relleno del rectángulo
        ctx.fillStyle = 'rgb(100, 100, 255';
        //-- Mostrar el relleno
        ctx.fill();
        //-- Mostrar el trazo del rectángulo
        ctx.stroke();
    ctx.closePath();
}

// funcion dibujar bola
function bola(){
    var imagen = new Image();
    imagen.src = 'bola.jpg'
    ctx.beginPath();
        ctx.arc(X_bola, Y_bola, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = ctx.createPattern(imagen, "repeat");
        //-- Dibujar el trazo
        ctx.stroke()
        //-- Dibujar el relleno
        ctx.fill()
    ctx.closePath();
}

// funcion destruir ladrillo
function BYE_ladrillo(){
    for(let i = 0; i < LADRILLO.FILA; i++){
        for(let j = 0; j < LADRILLO.COLUMNA; j++){
            if(X_bola >= ladrillos[i][j].x && X_bola <= (ladrillos[i][j].x+35+10) && Y_bola >= ladrillos[i][j].y && Y_bola <= (ladrillos[i][j].y)+30+10 && ladrillos[i][j].VISIBLE){
                destruir.currentTime = 0;
                destruir.play();
                ladrillos[i][j].VISIBLE = false;
                velocidad_Y = -velocidad_Y;
                if(ladrillos[i][j].y == 280){
                    puntos = puntos + 1;
                }
                if(ladrillos[i][j].y == 230){
                    puntos = puntos + 2;
                }
                if(ladrillos[i][j].y == 180){
                    puntos = puntos + 3;
                }
                if(ladrillos[i][j].y == 130){
                    puntos = puntos + 5;
                }
                if(ladrillos[i][j].y == 80){
                    puntos = puntos + 10;
                }
                
            }
        }
    }  
}

function puntuacion(){
    ctx.font = "25px Original Surfer";
    ctx.fillStyle = 'white';
    ctx.fillText('Puntos: ', 10, 40);
}

function puntuacion2(){
    ctx.font = "25px Original Surfer";
    ctx.fillStyle = 'rgb(96,210,241)';
    ctx.fillText(puntos, 110, 40);
}

function vidas_(){
    ctx.font = "25px Original Surfer";
    ctx.fillStyle = 'white';
    ctx.fillText('Vidas: ', 380, 40);
}
function vidas_2(){
    ctx.font = "25px Original Surfer";
    ctx.fillStyle = 'rgb(96,210,241)';
    ctx.fillText(vidas, 470, 40);
}
function cronometro(){
    ctx.font = "25px Original Surfer";
    ctx.fillStyle = 'red';
    ctx.fillText('Tiempo: ', 180, 40);
    ctx.fillText(minutos + ':' + segundos, 280, 40);
}

// funcion fin
function fin(){
    if(estado == ESTADO.FIN){
        //estado = ESTADO.INIT;
        microsegundos = 0;
        vidas = 3;
        puntos = 0;
        for(let i = 0; i < LADRILLO.FILA; i++){
            for(let j = 0; j < LADRILLO.COLUMNA; j++){
                ladrillos[i][j].VISIBLE = true;
            }
        }
        ctx.font = "50px Original Surfer";
        ctx.fillStyle = 'red';
        ctx.fillText('FIN DEL JUEGO', 50, 400);
        ctx.font = "20px Original Surfer";
        ctx.fillStyle = 'white';
        ctx.fillText('Pulsa espacio y vuelve a jugar', 100, 470);
        X_bola = 250;
        Y_bola = 710;
        X_bloque = 210;
        Y_bloque = 760;
    }
}

// funcion ganar
function ganar(){
    microsegundos = 0;
    if(puntos == 189){
        for(let i = 0; i < LADRILLO.FILA; i++){
            for(let j = 0; j < LADRILLO.COLUMNA; j++){
                ladrillos[i][j].VISIBLE = true;
            }
        }
        ctx.font = "50px Original Surfer";
        ctx.strokeStyle = 'green';
        ctx.fillText('GANASTE', 60, 450);
        X_bola = 250;
        Y_bola = 710;
        X_bloque = 210;
        Y_bloque = 760;
    }
}

function time(){
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


// estado inicial
function inicio(){
    if(estado == ESTADO.INIT){
        X_bola = 250;
        Y_bola = 710;
        X_bloque = 210;
        Y_bloque = 760;
        velocidad_X = 0;
        velocidad_Y = 0;
        segundos = 0;
        minutos = 0;
        microsegundos = 0;
    }
}

// mover bloque
window.onkeydown = (e) => {
    console.log();
    //-- Según la tecla se hace una cosa u otra
    switch (e.key) {
        case ".": // derecha
            X_bloque = X_bloque + 30;
            break;
        case ",": //izquierda
            X_bloque = X_bloque - 30; 
        case " ":
            estado = ESTADO.JUEGO;
            break;
    }
}

function update(){

    console.log("test");
    // estado inicial
    inicio();

    if(estado == ESTADO.JUEGO){
         // Choque con mi bloque
         if(X_bola >= X_bloque && X_bola < (X_bloque+80+10) && Y_bola >= (Y_bloque-10) && Y_bola < (Y_bloque+20+10)){
            rebote.currentTime = 0;
            rebote.play();
            //velocidad_X = -velocidad_X;
            velocidad_Y = -velocidad_Y;
        }

        if(velocidad_X == 0 && velocidad_Y == 0){
            velocidad_X = 5;
            velocidad_Y = -3;
        }

        // Rebote vertical
        if (X_bola < 12 || X_bola >= (canvas.width - 10) ) {
            velocidad_X = -velocidad_X;
        }

        // Rebote horizontal
        if (Y_bola <= 10 || Y_bola > (canvas.height - 12)) {
            velocidad_Y = -velocidad_Y;
            
        }

        // Actualizamos posicion
        X_bola = X_bola + velocidad_X;
        Y_bola = Y_bola + velocidad_Y;

       

        // si no golpeo, pierdo
        if(Y_bola > 762){
            estado = ESTADO.INIT;
            vidas = vidas - 1; // si no golpeo, resto una vida
        }

        // Que no desaparezca mi bloque
        if(X_bloque < 0){
            X_bloque = 0;
        }
        if(X_bloque > 420){
            X_bloque = 420;
        }

        BYE_ladrillo();
    }
    
    // Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // dibujamos los ladrillos
    for(let i = 0; i < LADRILLO.FILA; i++){
        for(let j = 0; j < LADRILLO.COLUMNA; j++){
            // si es viisble, se pinta
            if(ladrillos[i][j].VISIBLE){
                ctx.beginPath();
                ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.W, LADRILLO.H);
                ctx.fillStyle = ladrillos[i][j].color;
                ctx.fill();
                ctx.closePath;
            }
        }
    }

    if(vidas == 0){
        estado = ESTADO.FIN;
    }


    // Dibujamos elementos visibles
    // Mi bloque
    bloque();

    // Mi bola
    bola();

    // puntos
    puntuacion();
    puntuacion2();

    // vidas
    vidas_();
    vidas_2();

    // perder
    fin();

    //ganar
    ganar();

    //time
    time();
    cronometro();
    

    // Volver a ejecutar cuando toque
    requestAnimationFrame(update);

}


// Empezamos funciton
update();