//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const btn_video1 = document.getElementById("btn_video1");
const btn_video2 = document.getElementById("btn_video2");
const btn_test = document.getElementById("btn_test");
const btn_manu = document.getElementById("btn_manu");
const btn_auto = document.getElementById("btn_auto");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  TRANSMITIENDO: 1,
}
var automatico = false;
//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;
video1.width=200;  
video1.height=100;
video2.width=200;  
video2.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "btn_test.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
  estado = ESTADO.TRANSMITIENDO;
 
  //-- Establecer la fuente de la cámara 1 y 2
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();

  //-- Y en silencio...
  video1.muted;
  video2.muted;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
};

//-- Boton de FUENTES-OFF
btn_src_off.onclick = () => {
  estado = ESTADO.INIT;
 console.log("OFFFF")
  video1.src = null;
  video2.src = null;
  video1.poster = TEST_IMAGE_URL;
  video2.poster = TEST_IMAGE_URL;
  directo.src = null;
  directo.poster = TEST_IMAGE_URL;
};

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
};

//-- Botón de manual
btn_manu.onclick = () => {
  automatico = false;
};



//-- Botón de auto
btn_auto.onclick = () => {
  automatico = true;
  automat();
};

function camara1(){
  if (estado == ESTADO.TRANSMITIENDO){
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster=null;
  }
}

function camara2(){
  if (estado == ESTADO.TRANSMITIENDO){
    directo.src = video2.src;
    directo.currentTime = video2.currentTime;
    directo.play();
    directo.poster=null;
  }
}

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
  camara1();
};

//-- Botón de Selección de la cámara 1
btn_video2.onclick = () => {
  camara2();
};