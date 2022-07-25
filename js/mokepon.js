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

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

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
let mascotaJugadorObjeto;
let ataqueJugador = [];
let ataqueEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 550;

if(anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

// mokepon class

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.ancho,
      this.alto
    );
  }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png", 5, "./assets/hipodoge-face.png");
let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png", 5, "./assets/capipepo-face.png");
let ratigueya = new Mokepon("Ratigueya", "./assets/ratigueya.png", 5, "./assets/ratigueya-face.png");

let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/hipodoge.png", 5, "./assets/hipodoge-face.png");
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/capipepo.png", 5, "./assets/capipepo-face.png");
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/ratigueya.png", 5, "./assets/ratigueya-face.png");


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

hipodogeEnemigo.ataques.push(
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Tierra 🌱", id: "boton-tierra"}
)
capipepoEnemigo.ataques.push(
  {nombre: "Tierra 🌱", id: "boton-tierra"},
  {nombre: "Tierra 🌱", id: "boton-tierra"},
  {nombre: "Tierra 🌱", id: "boton-tierra"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Fuego 🔥", id: "boton-fuego"}
)
ratigueyaEnemigo.ataques.push(
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Fuego 🔥", id: "boton-fuego"},
  {nombre: "Agua 💧", id: "boton-agua"},
  {nombre: "Tierra 🌱", id: "boton-tierra"}
)

mokepones.push(hipodoge, capipepo, ratigueya);
//mokeponesEnemigo.push(hipodogeEnemigo, capipepoEnemigo, ratigueyaEnemigo);


function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
  sectionVerMapa.style.display = "none";

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
  sectionSeleccionarMascota.style.display = "none";
  sectionVerMapa.style.display = "flex";

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

  iniciarMapa();
  extraerAtaques(mascotaJugador);
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

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
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

function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  );
  mascotaJugadorObjeto.pintarMokepon();
  hipodogeEnemigo.pintarMokepon();
  capipepoEnemigo.pintarMokepon();
  ratigueyaEnemigo.pintarMokepon();

  if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY!== 0) {
    revisarColision(hipodogeEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  }
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch(event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota();
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for(let i=0; i<mokepones.length; i++) {
    if(mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if(
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return
  } else {
    detenerMovimiento();
    clearInterval(intervalo);
    sectionSeleccionarAtaque.style.display = "flex";
    sectionVerMapa.style.display = "none";
    seleccionarMascotaEnemigo(enemigo);
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);