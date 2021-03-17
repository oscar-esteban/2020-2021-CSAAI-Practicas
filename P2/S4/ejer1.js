console.log("Ejecutnado JS...");


//-- Obtener el párrafo
const test = document.getElementById('test');

//-- Funcion de retrollamada de la pulsación del párrafo
test.onclick = () => {
    console.log("Click!");
}