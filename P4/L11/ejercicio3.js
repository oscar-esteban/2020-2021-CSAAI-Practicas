console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizadorRojo = document.getElementById('rojo');
const deslizadorVerde = document.getElementById('verde');
const deslizadorAzul = document.getElementById('azul');

//-- Valor del deslizador
const range_valueRojo = document.getElementById('range_valueR');
const range_valueVerde = document.getElementById('range_valueV');
const range_valueAzul = document.getElementById('range_valueA');

document.getElementById('sliders').style.display = 'none';

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};


//-- Funcion de retrollamada del deslizador
deslizadorRojo.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_valueR.innerHTML = deslizadorRojo.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral = deslizadorRojo.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizador
deslizadorVerde.oninput = () => {

    range_valueV.innerHTML = deslizadorVerde.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    umbral = deslizadorVerde.value
    for (let i = 1; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i] = umbral;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  //-- Funcion de retrollamada del deslizador
deslizadorAzul.oninput = () => {

    range_valueA.innerHTML = deslizadorAzul.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    umbral = deslizadorAzul.value
    for (let i = 2; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i] = umbral;
    }
    ctx.putImageData(imgData, 0, 0);
  }

console.log("Fin...");