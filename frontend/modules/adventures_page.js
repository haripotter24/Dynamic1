import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // const url = new URL(search);
  // return url.searchParams.get('city');
  let params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const url = await fetch(
      config.backendEndpoint + "/adventures?city=" + city);
    const adventures = await url.json();
    // console.log(adventures);
    return adventures;
  } catch (error) {
    return null;
  }
}
  function addAdventureToDOM(adventures){
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures)
  for (let i of adventures) {
    let div2=document.createElement('div');
    div2.className='col-lg-3 col-md-6 col-sm-12 mb-3';
    div2.innerHTML = `
    <a href="detail/?adventure=${i.id}" id="${i.id}">
        <div class="card activity-card">
            <img src="${i.image}">      
        <div class="category-banner">${i.category}</div>
        <div class="card-body justify-content-start">
        <div class="d-md-flex justify-content-between">
            <p class="card-text">${i.name}</p>
            <p class="card-text">₹${i.costPerHead}hrs</p>
        </div>
        <p class="card-text">duration:${i.duration}hrs</p>
        </div>
        </div>
    </a>`;
    console.log(div2);
    let data = document.getElementById("data");
    data.append(div2);
  }
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(low);
  let newlist=list.filter(function(i){
    return (i.duration>=low && i.duration<=high);
  });
  return newlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newlist=list.filter(function(i){
    return categoryList.indexOf(i.category)>=0;
  });
  return newlist;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters["duration"].length>0)
  {
    let str=filters["duration"];
    const low = parseInt(str.substring(0, str.indexOf("-")));
    const high= parseInt(str.substring(str.indexOf('-')+1,str.length));
    list=filterByDuration(list,low,high);
  }
  if(filters["category"].length>0)
  {
    list=filterByCategory(list,filters["category"]);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  var filters = localStorage.getItem("filters");
  // Place holder for functionality to work in the Stubs
  filters=JSON.parse(filters)
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  var i=filters["category"];
  let div=document.getElementById("category-list");
  for( let it in i)
  {
    let div1=document.createElement("div");
    div1.setAttribute("class","category-filter");
    div1.textContent=i[it];
    div.append(div1);
  }
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
