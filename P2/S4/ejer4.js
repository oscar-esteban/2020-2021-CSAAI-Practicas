
console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM
const display = document.getElementById("display");
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");

var nuevo = ""
//-- Configurar retrollamada del boton
boton1.onclick = () => {
  console.log("Click!");
  nuevo = nuevo + " 1"

  //-- Actualizar el display
  display.innerHTML = "Numeros: " + nuevo ;
}
boton2.onclick = () => {
  console.log("Click!");
  nuevo = nuevo + " 2"

  //-- Actualizar el display
  display.innerHTML = "Numeros: " + nuevo ;
}