console.log("Ejecutando JS.....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img1 = document.getElementById('image1');
const img2 = document.getElementById('image2');
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
const bColores = document.getElementById('colores');
const bGris = document.getElementById('grises');
const bNegativo= document.getElementById('negativo');
const bHorizontal= document.getElementById('horizontal');
const bVertical= document.getElementById('vertical');

document.getElementById('sliders').style.display = 'none';

var img = img1;
img1.style.border="rgb(22, 122, 2) 4px solid";

//cuando pinchas en una imagen
image1.onclick = () => {
    console.log("Imagen 1");
    img1.style.border="rgb(22, 122, 2) 4px solid";
    img2.style.border="black 2px solid";
    img1.src="djoco.jpg";
    img = img1 ;
}
image2.onclick = () => {
    console.log("Imagen 2");
    img2.style.border="rgb(22, 122, 2) 4px solid";
    img1.style.border="black 2px solid";
    img2.src="fede.jpg";
    img= img2 ;
}



//una vez pinchado en la imagen la cargo en el canvas 
img1.onload = function(){
    canvas.width = img1.width;
    canvas.height = img1.height;
    console.log("Imagen1 ready");
    deslizadores();
    
  };

img2.onload = function(){
    canvas.width = img2.width;
    canvas.height = img2.height;
    console.log("Imagen2 ready");
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

//funcion para poner la imagen en grises
function grises(){
  var grises = 0;
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  for (var i = 0; i < data.length; i+=4) {
    grises = (3 * data[i] + 4 * data[i+1] + data[i+2])/8;
    data[i] = grises;
    data[i+1] = grises;
    data[i+2] = grises;
  }
  ctx.putImageData(imgData, 0, 0);
}

//funcion para negativo
function negativo(){
    //--Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
    //--Obtener el array con todos los píxeles
    let data = imgData.data;
    for (let i = 0; i < data.length; i+=4) {
      //--Calcular RGB complementario
      data[i] = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }
    ctx.putImageData(imgData, 0,0);
  }

  //función invertir horizontal
function invertirH(){
    ctx.drawImage(img, 0,0);
    ctx.translate(2*(img.width)/2,0);
    ctx.scale(-1,1);
    ctx.drawImage(img, 0,0);
  }

  //función invertir vertical
function invertirV(){
    ctx.drawImage(img, 0,0);
    ctx.translate(0,2*(img.height)/2);
    ctx.scale(1,-1);
    ctx.drawImage(img, 0,0);
  }

//BOTONES
 bColores.onclick = () => {
  ctx.drawImage(img, 0,0);
  console.log("coloresd");
  document.getElementById('sliders').style.display = 'block';
  
}

bGris.onclick = () => {
  console.log("grisesd");
  document.getElementById('sliders').style.display = 'none';
  grises();
}

bNegativo.onclick = () =>{
    console.log("aplico filtro negativo");
    document.getElementById('sliders').style.display = 'none';
    negativo();
  }

  bHorizontal.onclick = () =>{
    console.log("invierto imagen de forma horizontal");
    invertirH();
  }
  bVertical.onclick = () =>{
    console.log("invierto imagen de forma vertical");
    invertirV();
  }


console.log("Fin.");//FIN