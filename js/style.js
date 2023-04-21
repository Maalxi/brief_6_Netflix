import { API } from "../hide/API.js";

const base_url = `https://api.themoviedb.org/3/`;
const api_key = `api_key=` + API;

const base_image = `https://image.tmdb.org/t/p/w342`;

const les_plus_pop = `${base_url}movie/popular?${api_key}&language=fr-FR&page=1`;

const serie = `${base_url}tv/10/similar?${api_key}&language=fr-FR&page=1`;

const top_rated = `${base_url}movie/top_rated?${api_key}&language=fr-FR&page=1`;

const DBsuper = `${base_url}movie/126963?${api_key}&language=fr-FR`;

// Récupérer le bouton plus d'information
const infoButton = document.querySelector(".info");

const div = document.createElement("div");
const img = document.createElement("img");

// Récupérer l'élément input et le bouton de recherche
const input = document.querySelector(".search");

const SectionAccueil = document.querySelector(".accueil");
const SectionSearch = document.querySelector(".recherche");

const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    hideModal();
  }
});

function showModal(event) {
  const title = event.target.getAttribute("data-title");
  const description = event.target.getAttribute("data-description");
  const image = event.target.getAttribute("data-image");

  const modal = document.createElement("div");
  modal.classList.add("modal", "is-active");

  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");
  modal.appendChild(modalBackground);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalImageContainer = document.createElement("div");
  modalImageContainer.classList.add("modal-image-container");

  const modalImage = document.createElement("img");
  modalImage.classList.add("modal-image");
  modalImage.setAttribute("src", image);
  modalImageContainer.appendChild(modalImage);

  modalContent.appendChild(modalImageContainer);

  const modalTextContainer = document.createElement("div");
  modalTextContainer.classList.add("modal-text-container");

  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = title;
  modalTextContainer.appendChild(modalTitle);

  const modalDescription = document.createElement("p");
  modalDescription.classList.add("modal-description");
  modalDescription.textContent = description;
  modalTextContainer.appendChild(modalDescription);

  modalContent.appendChild(modalTextContainer);

  modal.appendChild(modalContent);

  const modalClose = document.createElement("button");
  modalClose.classList.add("modal-close", "is-large");
  modalClose.setAttribute("aria-label", "close");
  modalClose.addEventListener("click", hideModal);
  modal.appendChild(modalClose);

  document.body.appendChild(modal);
}

function hideModal() {
  const modal = document.querySelector(".modal");
  modal.remove();
  document.removeEventListener("keydown", handleKeyDown);
}

function handleSearch(event) {
  // Vérifier si la touche appuyée est la touche Entrée
  if (event.keyCode === 13) {
    SectionSearch.classList.remove("hide");
    SectionAccueil.classList.add("hide");

    // Empêcher le formulaire de se soumettre
    // event.preventDefault();

    // Récupérer la valeur entrée par l'utilisateur
    let query = input.value;

    let page = 1;

    // Effectuer la recherche
    performSearch(query, page);

    // Gérer les événements pour les boutons d'incrément et de décrément
    document.querySelector(".incremente").addEventListener("click", () => {
      if (page < 19) {
        page++;
        updatePage(query, page);
      }
    });

    document.querySelector(".decrement").addEventListener("click", () => {
      if (page > 1) {
        page--;
        updatePage(query, page);
      }
    });
  }
}

function performSearch(query, page) {
  // Créer la requête API avec la valeur de recherche
  let url = `${base_url}search/multi?${api_key}&language=fr-FR&query=${query}&page=${page}&include_adult=false`;

  // Envoyer la requête API avec fetch()
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data.results);
    });
}

function updatePage(query, page) {
  // Mettre à jour l'URL de la recherche avec la nouvelle page
  let url = `${base_url}search/multi?${api_key}&language=fr-FR&query=${query}&page=${page}&include_adult=false`;

  // Envoyer la requête API avec fetch()
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data.results);
    });
}

function displayResults(results) {
  const container = document.querySelector(".container-search-image");

  // Supprimer les résultats précédents
  container.innerHTML = "";

  // Ajouter les nouveaux résultats
  for (let i = 0; i < results.length; i++) {
    if (results[i].poster_path && results[i].overview && results[i].title) {
      const imagePath = base_image + results[i].poster_path;
      const img = document.createElement("img");

      img.classList.add("style-image-search");
      img.setAttribute("src", imagePath);
      img.setAttribute("data-image", imagePath);
      img.setAttribute("data-title", results[i].title);
      img.setAttribute("data-description", results[i].overview);
      img.addEventListener("click", showModal);

      container.appendChild(img);
    }
  }
}

// Écouter l'événement de saisie pour la recherche
input.addEventListener("keydown", handleSearch);


async function popular() {
  try {
    const response = await fetch(les_plus_pop);
    const data = await response.json();

    const popular = data.results;

    for (let i = 0; i < popular.length; i++) {
      if (popular[i].poster_path && popular[i].overview && popular[i].title) {
        const img = document.createElement("img");
        const imagePath = base_image + popular[i].poster_path;
        img.classList.add("carousel-item");
        img.setAttribute("src", imagePath);
        img.setAttribute("data-title", popular[i].title);
        img.setAttribute("data-description", popular[i].overview);
        img.setAttribute("data-image", imagePath);
        img.addEventListener("click", showModal);
        document.querySelector(".popular").appendChild(img);
      }
    }
    document.querySelector(".popular").appendChild(img);
  } catch (error) {
    // console.log(error);
  }
}

popular();

async function seerie() {
  try {
    const response = await fetch(serie);
    const data = await response.json();

    const serie = data.results;

    // Ajoute un événement de clic à l'image
    for (let i = 0; i < serie.length; i++) {
      if (serie[i].poster_path && serie[i].overview && serie[i].title) {
        const img = document.createElement("img");
        const imagePath = base_image + serie[i].poster_path;
        img.classList.add("carousel-item");
        img.setAttribute("src", imagePath);
        img.setAttribute("data-title", serie[i].name);
        img.setAttribute("data-description", serie[i].overview);
        img.setAttribute("data-image", imagePath);
        img.addEventListener("click", showModal);
        document.querySelector(".serie").appendChild(img);
      }
    }
    document.querySelector(".serie").appendChild(img);
  } catch (error) {
    // console.log(error);
  }
}

seerie();

async function toop_rated() {
  try {
    const response = await fetch(top_rated);
    const data = await response.json();

    const toop_rated = data.results;

    for (let i = 0; i < toop_rated.length; i++) {
      if (
        toop_rated[i].poster_path &&
        toop_rated[i].overview &&
        toop_rated[i].title
      ) {
        const img = document.createElement("img");
        const imagePath = base_image + toop_rated[i].poster_path;
        img.classList.add("carousel-item");
        img.setAttribute("src", imagePath);
        img.setAttribute("data-title", toop_rated[i].title);
        img.setAttribute("data-description", toop_rated[i].overview);
        img.setAttribute("data-image", imagePath);
        img.addEventListener("click", showModal);
        document.querySelector(".top_rated").appendChild(img);
      }
    }
    document.querySelector(".top_rated").appendChild(img);
  } catch (error) {
    // console.log(error);
  }
}

toop_rated();

// Récupérer le bouton modal
const modalButton = document.querySelector("#modal-button-info");

// Ajouter un écouteur d'événement "click" sur le bouton info
modalButton.addEventListener("click", () => {
  // Créer le contenu du modal
  showModal(event);
});
