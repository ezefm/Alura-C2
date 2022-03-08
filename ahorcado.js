const canvas = document.getElementById("ahorcado");
const ctx = canvas.getContext("2d");
const parrafo = document.querySelector(".fp")
const canvasDIV = document.querySelector(".canvasDIV");
const startDIV = document.querySelector(".startDiv");
const addWordButton = document.getElementById("addWordButton");
const newWord = document.getElementById("newWord");
const startButton = document.getElementById("startButton");
const imagen = new Image();
var misPalabras = ["ALURA", "AHORCADO", "HOLA"];
window.onload = function(){
  imagen.src = "images/ahorcado0.png";
  ctx.drawImage(imagen, 325, 50, 300, 300);
}
startButton.addEventListener("click", function(){
  imagen.src = "images/ahorcado0.png";
  ctx.drawImage(imagen, 325, 50, 300, 300);
  canvasDIV.style.display="block"
  startDIV.style.display="none"
});

addWordButton.addEventListener("click", function(){
  word = newWord.value;
  if(word.length >= 4){
    misPalabras.push(word.toUpperCase());
    localStorage.setItem("words", JSON.stringify(misPalabras));
    var recuperarPalabras = localStorage.getItem("words");
    var words = JSON.parse(recuperarPalabras);
  }
});

localStorage.setItem("words", JSON.stringify(misPalabras));
var recuperarPalabras = localStorage.getItem("words");
var words = JSON.parse(recuperarPalabras);

// localStorage.clear();

randomWordIndex = Math.floor(Math.random()*words.length);
randomWord = words[randomWordIndex];
var newArray = []
newArray += randomWord;
var palabraNueva = ""
for (var i = 0; i < newArray.length; i++) {
  palabraNueva += newArray[i];
}

function tablero(){
  newDiv = document.createElement("div");
  newDiv.setAttribute("class", "CTXDiv");
  for (var i = 0; i < palabraNueva.length; i++) {
    var div = document.createElement("div");
    div.setAttribute("class", "CTODiv")
    var li = document.createElement("li")
    li.setAttribute("class", "letra")
    div.appendChild(li);
    newDiv.appendChild(div);
  }
  return newDiv;
}
tablero()
canvasDIV.appendChild(newDiv);
const teclasPresionadas = document.querySelector(".teclasPresionadas");
const letters = document.querySelector(".letra")
const tagNane= document.getElementsByTagName("li");

var errores = 0;
var palabraCorrecta = [];
var palabraCorrecta1 = [...new Set(palabraNueva)];
function horca(errores){
    // Dibujar imagen segun error;
    imagen.src = "images/ahorcado"+errores+".png";
    imagen.onload = function(){
       ctx.drawImage(imagen, 325, 50, 300, 300);
    }
}
function validacion(){
  if (errores >= 7){
    newDiv.style.display="none";
    newGame.style.display="block"
    parrafo.textContent="¡Has perdido! la palabra correcta era: "+palabraNueva;
  } else if (palabraCorrecta1.length === palabraCorrecta.length){
    newDiv.style.display="none";
    newGame.style.display="block"
    parrafo.textContent="¡Has Ganado! La palabra correcta era: "+palabraNueva;
  }
}
var letraCorrecta = [];
startButton.addEventListener("click", function(){
  window.onkeydown = function (event) {
    // Capturando evento de teclado;
    var evt = event || window.event;
    var key = event.keyCode || evt.which;
    if (key >= 65 && key <= 90){
      var acierto = 0;
      letraIngresada = String.fromCharCode(key);
      for (var i = 0; i < palabraNueva.length; i++) {
        if(letraIngresada === palabraNueva[i]){
          tagNane[i].textContent = palabraNueva[i];
          acierto += 1;
          letraCorrecta += letraIngresada;
          var palabraCorrecta = [...new Set(letraCorrecta)];
        }
      }
      if (acierto < 1){
        errores += 1;
      }
      horca(errores);
      validacion();
      if (palabraCorrecta1.length === palabraCorrecta.length){
        newDiv.style.display="none";
        newGame.style.display="block"
        parrafo.textContent="¡Has Ganado! La palabra correcta era: "+palabraNueva
        imagen.src = "images/salvado.png";
        imagen.onload = function(){
           ctx.drawImage(imagen, 325, 50, 300, 300);
        }
      }
    }
  }
});
const newGame = document.querySelector(".newGame");
newGame.addEventListener("click", _ =>{
  location.reload();
});
