console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizadores
const deslizadorRojo = document.getElementById('rojo');
const deslizadorVerde = document.getElementById('verde');
const deslizadorAzul = document.getElementById('azul');

//-- Valor del deslizador
const range_valueRojo = document.getElementById('range_valueR');
const range_valueVerde = document.getElementById('range_valueV');
const range_valueAzul = document.getElementById('range_valueA');


//-- Constantes de los botones
const bGris = document.getElementById('grises');
const bColores = document.getElementById('colores');

document.getElementById('sliders').style.display = 'none';


img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0,0);
  console.log("Imagen lista...");
  deslizadores();
};

//filtro de los colores
function filtroColores(data){
  var umbralR = deslizadorRojo.value;
  var umbralG = deslizadorVerde.value;
  var umbralB = deslizadorAzul.value;
  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
    }
}
//funcion para cuando manejo los deslizadores
function deslizadores(){
  
  ctx.drawImage(img, 0,0); //retrollamada de los deslizadores
  
  deslizadorRojo.oninput = () => {
    range_valueRojo.innerHTML = deslizadorRojo.value;//muestro el nuevo valor del deslizador
    ctx.drawImage(img, 0,0); //Situo la imagen 1 en el canvas
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//Obtener la imagen del canvas en pixeles
    let data = imgData.data; //Obtener el array con todos los píxeles
    filtroColores(data); // Obtener el umbral del rojo según del deslizador
    //Insertar imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  deslizadorVerde.oninput = () => {
    range_valueVerde.innerHTML = deslizadorVerde.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    //-- Obtener el umbral del verde del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }

  deslizadorAzul.oninput = () => {
    range_valueAzul.innerHTML = deslizadorAzul.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    //-- Obtener el umbral del azul del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }
}
//BOTONES
 bColores.onclick = () => {
  ctx.drawImage(img, 0,0);
  console.log("colores");
  document.getElementById('sliders').style.display = 'block';
  
}

bGris.onclick = () => {
  console.log("grises");
  document.getElementById('sliders').style.display = 'none';
  
}


console.log("Fin.");//FIN