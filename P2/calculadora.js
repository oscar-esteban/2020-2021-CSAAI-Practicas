display = document.getElementById("display")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")
igual = document.getElementById("igual")

//-- Crear un array con todos los elementos
//-- de la clase digito
digito = document.getElementsByClassName("digito")

for (i=0; i<digito.length; i++) {
  digito[i].onclick = (ev) => {
    if (display.innerHTML == "0"){
      display.innerHTML = ev.target.value;
    }else{
      display.innerHTML += ev.target.value;
    }
    click.play();
  }
}

//-- Crear un array con todos los elementos
//-- de la clase operador
operador = document.getElementsByClassName("operador")

for (i=0; i<operador.length; i++) {
  operador[i].onclick = (ev) => {
    if (display.innerHTML == "0"){
      display.innerHTML = ev.target.value;
    }else{
      display.innerHTML += ev.target.value;
    }
    click.play();
  }
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
  click.play();
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
  click.play();
}

//-- Borrar el ultimo numero u operador
//-- introducido en el array
borrar.onclick = () => {
  if (display.innerHTML == "0"){
    display.innerHTML = "0";
  }else if (display.innerHTML == ""){
    display.innerHTML = "0";
  }else{
    display.innerHTML = display.innerHTML.slice(0,-1)
  }
  click.play();
}