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
}

// Ajouter un événement "keydown" sur l'input
input.addEventListener("keydown", (event) => {
  // Vérifier si la touche appuyée est la touche Entrée
  if (event.keyCode === 13) {
    // Empêcher le formulaire de se soumettre
    event.preventDefault();

    // Récupérer la valeur entrée par l'utilisateur
    const query = input.value;

    // Créer la requête API avec la valeur de recherche
    const url = `${base_url}search/multi?${api_key}&language=fr-FR&query=${query}&page=1&include_adult=false`;

    // Envoyer la requête API avec fetch()
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Afficher les résultats dans la console
        console.log(data.results);
      });
  }
});

async function popular() {
  try {
    const response = await fetch(les_plus_pop);
    const data = await response.json();

    const popular = data.results;

    for (let i = 0; i < popular.length; i++) {
      if (popular[i].poster_path && popular[i].overview) {
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
    showModal();
    hideModal();
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

    const popular = data.results;

    // Ajoute un événement de clic à l'image
    for (let i = 0; i < popular.length; i++) {
      if (popular[i].poster_path && popular[i].overview) {
        const img = document.createElement("img");
        const imagePath = base_image + popular[i].poster_path;
        img.classList.add("carousel-item");
        img.setAttribute("src", imagePath);
        img.setAttribute("data-title", popular[i].name);
        img.setAttribute("data-description", popular[i].overview);
        img.setAttribute("data-image", imagePath);
        img.addEventListener("click", showModal);
        document.querySelector(".serie").appendChild(img);
      }
    }
    showModal();
    hideModal();
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

    const popular = data.results;

    for (let i = 0; i < popular.length; i++) {
      if (popular[i].poster_path && popular[i].overview) {
        const img = document.createElement("img");
        const imagePath = base_image + popular[i].poster_path;
        img.classList.add("carousel-item");
        img.setAttribute("src", imagePath);
        img.setAttribute("data-title", popular[i].title);
        img.setAttribute("data-description", popular[i].overview);
        img.setAttribute("data-image", imagePath);
        img.addEventListener("click", showModal);
        document.querySelector(".top_rated").appendChild(img);
      }
    }
    showModal();
    hideModal();
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
