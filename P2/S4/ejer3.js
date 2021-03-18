
console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM
const display = document.getElementById("display");
const boton = document.getElementById("boton");

var nuevo = ""
//-- Configurar retrollamada del boton
boton.onclick = () => {
  console.log("Click!");
  nuevo = nuevo + " 1"

  //-- Actualizar el display
  display.innerHTML = "Numeros: " + nuevo ;
}