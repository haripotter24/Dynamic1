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
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const parentOfAll = document.getElementById("data");

  const Div1 = document.createElement("div");
  Div1.setAttribute("class","tile col-lg-3 col-md-6 col-sm-12");
  Div1.setAttribute("id",id);

  const AnchorTag = document.createElement("a");
  AnchorTag.setAttribute("href","pages/adventures/?city="+id);

  const ImageTag = document.createElement("img");
  ImageTag.setAttribute("src",image);
  ImageTag.setAttribute("class","img-fluid");
  
  // append to division

  //Div1.append(ImageTag);

  const DivTile = document.createElement("div");
  DivTile.setAttribute("class","tile");

  const TextDiv = document.createElement("div")
  TextDiv.setAttribute("class","tile-text");
  const h2 = document.createElement("h2")
  h2.textContent = city;
  const p = document.createElement("p");
  p.textContent = description;

  TextDiv.append(h2);
  TextDiv.append(p);

  // append to parent
  DivTile.append(ImageTag);
  DivTile.append(TextDiv);

  AnchorTag.append(DivTile);

  Div1.append(AnchorTag);

  //Div1.append(TextDiv);

  parentOfAll.append(Div1);

}

export { init, fetchCities, addCityToDOM };
