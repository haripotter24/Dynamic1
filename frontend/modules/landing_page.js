import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response =await fetch(config.backendEndpoint+"/cities");
    const json= await response.json();
    return json;
  }
  catch(error){return null;}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let div = `
  <div class="col-12 col-sm-6 col-lg-3 mb-4">
      <a id="${id}" href="pages/adventures/?city=${id}">
        <div class="tile rounded">
          <img src="${image}" class="rounded" alt="${city} image" />
          <div class="tile-text text-center">
            <h5>${city}</h5>
            <p>${description}</p>
          </div>
        </div></a
      >
    </div>`;
  let data=document.getElementById("data");
  data.innerHTML+= div;
  return data;
}

export { init, fetchCities, addCityToDOM };

