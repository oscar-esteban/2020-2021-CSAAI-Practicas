
console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM

const boton = document.getElementById("boton");

//-- Configurar retrollamada del boton
boton.onclick = () => {
  console.log("Click!");

}