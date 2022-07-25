// global variables

const sectionReiniciar = document.getElementById("boton-reiniciar");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

let mokepones = [];
let opcionDeMokepones;
let opcionDeAtaques;
let ataquesMokeponEnemigo;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let indexAtaqueEnemigoUsado = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let mascotaJugador;
let ataqueJugador = [];
let ataqueEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;

// mokepon class

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png", 5);
let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png", 5);
let ratigueya = new Mokepon("Ratigueya", "./assets/ratigueya.png", 5);

hipodoge.ataques.push(
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Tierra 🌱", id: "boton-tierra"}
)
capipepo.ataques.push(
  {nombre: "Tierra 🌱", id: "boton-tierra"},
  {nombre: "Tierra 🌱", id: "boton-tierra"},
  {nombre: "Tierra 🌱", id: "boton-tierra"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Fuego 🔥", id: "boton-fuego"}
)
ratigueya.ataques.push(
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Tierra 🌱", id: "boton-tierra"}
)

mokepones.push(hipodoge, capipepo, ratigueya);


function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
      <input type="radio" name="mascota" id=${mokepon.nombre}>
      <label id="hipodoge-label" class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt="">
      </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  })
  inputHipodoge = document.getElementById("Hipodoge");
  inputCapipepo = document.getElementById("Capipepo");
  inputRatigueya = document.getElementById("Ratigueya");

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  sectionSeleccionarAtaque.style.display = "flex";
  sectionSeleccionarMascota.style.display = "none";

  if(inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if(inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if(inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota");
    location.reload();
  }

  extraerAtaques(mascotaJugador);
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i=0; i<mokepones.length; i++) {
    if(mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionDeAtaques = `
    <button class="boton-de-ataque BAtaque" id=${ataque.id}>${ataque.nombre}</button>
    `

    contenedorAtaques.innerHTML += opcionDeAtaques;
  })

  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if(e.target.textContent === "Fuego 🔥") {
        ataqueJugador.push("Fuego 🔥");
        boton.style.background = "#112f58"
        boton.disabled = true;
      } else if(e.target.textContent === "Agua 💧") {
        ataqueJugador.push("Agua 💧");
        boton.style.background = "#112f58"
        boton.disabled = true;
      } else if(e.target.textContent === "Tierra 🌱") {
        ataqueJugador.push("Tierra 🌱");
        boton.style.background = "#112f58"
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    })
  })
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length-1);
  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
  secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
  for(let i=ataquesMokeponEnemigo.length-1; i>0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = ataquesMokeponEnemigo[i];
    ataquesMokeponEnemigo[i] = ataquesMokeponEnemigo[j];
    ataquesMokeponEnemigo[j] = temp;
  }
  
  for(let i=0; i<ataquesMokeponEnemigo.length; i++) {
    ataqueEnemigo.push(ataquesMokeponEnemigo[i].nombre);
  }

  iniciarPelea()
}

function iniciarPelea() {
  if(ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  for (let i=0; i<ataqueJugador.length; i++) {
    if(ataqueJugador[i] === ataqueEnemigo[i]) {
      indexAmbosOponentes(i, i);
      crearMensaje("EMPATE");
    } else if(ataqueJugador[i] == 'Fuego 🔥' && ataqueEnemigo[i] == 'Tierra 🌱') {
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[i] == 'Agua 💧' && ataqueEnemigo[i] == 'Fuego 🔥') {
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[i] == 'Tierra 🌱' && ataqueEnemigo[i] == 'Agua 💧') {
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(i, i);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVictorias();
}

function revisarVictorias() {
  if(victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES! Ganaste 🎉");
  } else if(victoriasJugador < victoriasEnemigo) {
    crearMensajeFinal("Lo siento, perdiste 🥲");
  } else if(victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Empate, suerte la próxima 😸")
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');

  //sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);