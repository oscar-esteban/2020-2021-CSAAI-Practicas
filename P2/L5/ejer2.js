
console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM
const display = document.getElementById("display");
const boton = document.getElementById("boton");


//-- Configurar retrollamada del boton
boton.onclick = () => {
  console.log("Click!");


  //-- Actualizar el display
  display.innerHTML = "HOLA NIÑO";
}