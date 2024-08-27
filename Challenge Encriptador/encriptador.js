//Arreglar que deje de aparecer el candado cuando se borra toda la línea de texto.

const d = document;
const textarea = d.getElementById("miTextarea");
const muneco = d.querySelector(".result__img");
const carga = d.querySelector(".loader");
const resultadotext = d.getElementById("result__text");
const resulttitle = d.getElementById("result__title");
const buttonencrip = d.getElementById("encriptarBtn");
const buttondesencrip = d.getElementById("desencriptarBtn");
const buttoncopiar = d.getElementById("copiarBtn");

// Por algún motivo, ponerlas en orden hace que interprete mal la A, y no entiendo el porqué.
const llaves = [
  ["e", "entyr"],
  ["i", "imes"],
  ["o", "obtr"],
  ["u", "urzt"],
  ["a", "aik"],
];

function encriptarMensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1];
        break;
      }
    }
    mensajeEncriptado += encriptada;
  }
  return mensajeEncriptado;
}

function desencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;

  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
  }

  return mensajeDesencriptado;
}

textarea.addEventListener("input", (e) => {
  muneco.style.display = "none";
  carga.classList.remove("hidden");
  resulttitle.textContent = "Obteniendo mensaje";
  resultadotext.textContent = "";
});

//Buscar después como ajusto el tamaño sin arruinar el resto del diseño.
buttonencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  let mensajeEncriptado = encriptarMensaje(mensaje);
  resultadotext.textContent = mensajeEncriptado;
  resultadotext.style.fontSize = "16px"; 
  buttoncopiar.classList.remove("hidden");
  resulttitle.textContent = "El resultado es:";
});

buttondesencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  let mensajeDesencriptado = desencriptarMensaje(mensaje);
  resultadotext.textContent = mensajeDesencriptado;
  buttoncopiar.classList.remove("hidden");
});

buttoncopiar.addEventListener("click", () => {
  let textoCopiado = resultadotext.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
    muneco.style.display = "block";
    carga.classList.add("hidden");
    resulttitle.textContent = "El texto se copió";
  });
});
