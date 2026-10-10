const URL_API = "https://dragonball-api.com";

const listaPersonajesDragonBall = async (limit) => {
  const response = await fetch(`${URL_API}/api/characters?limit=${limit}`);
  const data = await response.json();
  return data.items;
};

const buscarPersonajesDragonBall = async (name) => {
  const response = await fetch(`${URL_API}/api/characters?name=${name}`);
  const data = await response.json();
  return data;
};

const baseTexto = (titulo, valor) => {
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  h2.textContent = titulo;
  p.textContent = valor;
  return { h2, p };
};

const informacionPersonaje = (title, value) => {
  const div = document.createElement("div");
  const titulos = baseTexto(title, value);
  div.appendChild(titulos.h2);
  div.appendChild(titulos.p);
  return div;
};

const construccionTarjetaPersonaje = (
  imagen,
  nombre,
  raza,
  genero,
  baseKi,
  totalKi,
  afilliation,
) => {
  const baseDiv = document.createElement("div");
  const containerImgDiv = document.createElement("div");
  const containerInfoDiv = document.createElement("div");
  const containerNameDiv = document.createElement("div");
  const containerStatsDiv = document.createElement("div");

  // definición contenedor padre
  baseDiv.className = "container-personaje";
  baseDiv.appendChild(containerImgDiv);
  baseDiv.appendChild(containerInfoDiv);

  // definición imagen
  const image = document.createElement("img");
  image.src = imagen;
  image.alt = `personaje-${nombre}-dragon-ball`;
  containerImgDiv.appendChild(image);

  // definición información del personaje
  containerInfoDiv.className = "container-info-personaje";
  containerInfoDiv.appendChild(containerNameDiv);
  containerInfoDiv.appendChild(containerStatsDiv);

  const nodoNombre = baseTexto(nombre, `${raza} - ${genero}`);
  containerNameDiv.className = "container-info-personaje-name";
  containerNameDiv.appendChild(nodoNombre.h2);
  containerNameDiv.appendChild(nodoNombre.p);

  const baseKiNodo = informacionPersonaje("Base KI:", baseKi);
  const totalKiNodo = informacionPersonaje("Total KI:", totalKi);
  const afilliationNodo = informacionPersonaje("Afilliation:", afilliation);

  containerStatsDiv.className = "container-info-personaje-stats";
  containerStatsDiv.appendChild(baseKiNodo);
  containerStatsDiv.appendChild(totalKiNodo);
  containerStatsDiv.appendChild(afilliationNodo);

  return baseDiv;
};

const impresora = document.querySelector("#impresora");
const containerChat = document.querySelector("#container-chat");
const searchButton = document.querySelector("#search-button");

containerChat.addEventListener("click", async () => {
  impresora.innerHTML = "";
  const countItems = document.querySelector("#count-items").value;
  const formatNumber = Number.parseInt(countItems);
  if (Number.isNaN(formatNumber)) {
    alert("Por favor, ingrese un número válido");
    return;
  }
  const personajes = await listaPersonajesDragonBall(formatNumber);
  for (const personaje of personajes) {
    const tarjeta = construccionTarjetaPersonaje(
      personaje.image,
      personaje.name,
      personaje.race,
      personaje.gender,
      personaje.ki,
      personaje.maxKi,
      personaje.affiliation,
    );

    impresora.appendChild(tarjeta);
  }
});

searchButton.addEventListener("click", async () => {
  impresora.innerHTML = "";
  const nameSearch = document.querySelector("#name-search").value;
  const personajes = await buscarPersonajesDragonBall(nameSearch);
  if(personajes.length === 0) {
    alert("No se encontraron personajes con ese nombre");
    return;
  }
  for (const personaje of personajes) {
    const tarjeta = construccionTarjetaPersonaje(
      personaje.image,
      personaje.name,
      personaje.race,
      personaje.gender,
      personaje.ki,
      personaje.maxKi,
      personaje.affiliation,
    );

    impresora.appendChild(tarjeta);
  }
});
