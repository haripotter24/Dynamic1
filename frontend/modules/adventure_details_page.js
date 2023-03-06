import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  return params.get("adventure");
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const url = await fetch(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId);
    const adventures = await url.json();
    // console.log(adventures);
    return adventures;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
    let i =adventure;
    let name = document.getElementById("adventure-name");
    name.textContent=i.name;
    let subtitle= document.getElementById("adventure-subtitle");
    subtitle.textContent=i.subtitle;
    let img= document.getElementById("photo-gallery");
    for(let j=0;j<i.images.length;j++)
    {
      let div=document.createElement("div");
      div.innerHTML=`<img src="${i.images[j]}" class="activity-card-image">`;
      img.append(div);
    }
    let content=document.getElementById("adventure-content")
    content.textContent=i.content;
  }

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let div=document.getElementById("photo-gallery");
  let div1=document.createElement("div");
  div.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">  
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
      </div>  
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      </div>`;

  let div2=document.getElementsByClassName("carousel-inner");
  console.log(div2);
  div2[0].innerHTML=`<div class="carousel-item active">
  <img src=${images[0]} class="activity-card-image" alt="">
</div>`;
  for(let i=1;i<images.length;i++)
  {
    div2[0].innerHTML+=`<div class="carousel-item">
    <img src=${images[i]} class="activity-card-image">
  </div>`;
  }
  console.log(div2[0]);
  // div.innerHTML+=div2;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available==true)
  {
    var x = document.getElementById("reservation-panel-sold-out");
    x.style.display = "none";
    var y= document.getElementById("reservation-panel-available");
    y.style.display ="block";
  }
  else{
    var x= document.getElementById("reservation-panel-available");
    x.style.display = "none";
    var y= document.getElementById("reservation-panel-sold-out");
    y.style.display="block";
  }
  var cop = document.getElementById("reservation-person-cost");
  cop.textContent = adventure.costPerHead;
  // console.log(adventure);
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalcost=document.getElementById("reservation-cost");
  totalcost.textContent=adventure.costPerHead*persons;
  // console.log(adventure);
}



//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  let x=document.getElementById("myForm");
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const update = {
    name: x.elements["name"].value,
    date: x.elements["date"].value,
    person: x.elements["person"].value,
    adventure:adventure.id,
    };
    
    const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    };
    fetch(config.backendEndpoint+"/reservations/new", options)
  .then(data => {
      if (!data.ok) {
        alert("Failed!");
        throw Error(data.status);
       }
       return data.json();
      }).then(update => {
        alert("Success!");
      }).catch(e => {
        alert("Failed!");
      console.log(e);
      });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  let x=document.getElementById("reserved-banner");
  if(adventure.reserved==true)
  {
    x.style.display="block";
  }
  else{
    x.style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
