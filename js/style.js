import { API } from "../hide/API.js";

const base_url = `https://api.themoviedb.org/3/`;
const api_key = `api_key=` + API;

const base_image = `https://image.tmdb.org/t/p/w342`;

const les_plus_pop = `https://api.themoviedb.org/3/movie/popular?${api_key}&language=fr-FR&page=1`;

const div = document.createElement("div");
const img = document.createElement("img");

async function popular() {
  try {
    const response = await fetch(les_plus_pop);
    const data = await response.json();
    
    const popular = data.results;

    for (let i = 0; i < popular.length; i++) {
        const img = document.createElement("img");
        const imagePath = base_image + popular[i].poster_path;
        img.setAttribute("src", imagePath);
        document.querySelector(".popular").appendChild(img);
    }
  } catch (error) {
    console.log(error);
  }
}

popular();


async function serie() {
  try {
    const response = await fetch(les_plus_pop);
    const data = await response.json();
    
    const popular = data.results;

    for (let i = 0; i < popular.length; i++) {
        const img = document.createElement("img");
        const imagePath = base_image + popular[i].poster_path;
        img.setAttribute("src", imagePath);
        document.querySelector(".serie").appendChild(img);
    }
  } catch (error) {
    console.log(error);
  }
}

serie();