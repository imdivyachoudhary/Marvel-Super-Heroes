// Marvel public key and private key
var apikey = "711ae2113dc5b535e66dc2ecb1833930";
var private_key = "602efb43dfe796b9454e3e7776bcd160bbef90ac";

var searchButton = document.getElementById("search-button");
var searchCharacter = document.getElementById("search-character");

// var marvelImages = document.getElementById("marvel-images");
var marvelImages = $("#marvel-images");

// Calling th Function to show the marvels
showCharacters();

// Adding event Listener to the search button to find marvel characters related to search
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  // console.log("hi");
  let ts = Date.now();
  let hash = CryptoJS.MD5(ts + private_key + apikey).toString();
  let searchString = searchCharacter.value;
  let reqData = {
    ts: ts,
    apikey: apikey,
    hash: hash,
    orderBy: "-modified",
    nameStartsWith: searchString,
    limit: 50,
  };

  showCharacters(reqData);
});

// Function to send request to the Marvel Api to fetch marvels
function showCharacters(reqData = null) {
  let url = "https://gateway.marvel.com/v1/public/characters";
  if (!reqData) {
    let ts = Date.now();
    let hash = CryptoJS.MD5(ts + private_key + apikey).toString();
    reqData = {
      ts: ts,
      apikey: apikey,
      hash: hash,
      orderBy: "modified",
      limit: 50,
    };
  }
  $.get(url, reqData, function (data) {
    let characters = data.data.results;
    // let newContent = "";
    // console.log(characters.length);
    if (characters.length === 0) {
      alert("No Marvels to show!!!");
    } else {
      // marvelImages.innerHTML = "";
      marvelImages.empty();
      characters.forEach((element) => {
        let id = element.id;
        let name = element.name;
        let src = element.thumbnail.path + "." + element.thumbnail.extension;
        let marvel = `
        <div class="card" id="card${id}" data-id="${id}" onclick="showAbout(this)">
          <div class="card-image">
            <img
              src="${src}"
              class="card-img-top"
              alt=""
            />
          </div>
          <div class="card-body">
            <div id="name${id}">
              <h5 class="card-title">${name}</h5>
            </div>
            <div id="favorites${id}" data-id="${id}" onclick="manageFavorites(event, this)">
              <div class="btn btn-favorite">Add To Favorites</div>
            </div>
          </div>
        </div>`;
        // console.log(id, name, src);
        // newContent += marvel;
        marvelImages.append(marvel);
      });
      // marvelImages.innerHTML = newContent;
    }
  });
  // console.log(ts);
}

// On clicking the marvel, this function will show details about that marvel
function showAbout(ele) {
  // console.log(ele.getAttribute("data-id"))
  // To store the id of clicked marvel so that it can be used in about page
  sessionStorage.setItem("aboutMarvelId", ele.getAttribute("data-id"));
  window.location.href = "about.html";
}

// For adding Marvels to Favorites
function manageFavorites(event, ele) {
  event.stopPropagation();
  // console.log(ele)
  let id = ele.getAttribute("data-id");
  let favoriteMarvels = JSON.parse(localStorage.getItem("favoriteMarvels"));
  if (favoriteMarvels) {
    // console.log(typeof(favoriteMarvels));
    if (favoriteMarvels.includes(id)) {
      alert("Marvel Already in your Favorites");
    } else {
      favoriteMarvels.push(id);
      // console.log(favoriteMarvels);
      localStorage.setItem("favoriteMarvels", JSON.stringify(favoriteMarvels));
      alert("Marvel Added to your Favorites");
    }
  } else {
    favoriteMarvels = [id];
    localStorage.setItem("favoriteMarvels", JSON.stringify(favoriteMarvels));
    alert("Marvel Added to your Favorites");
  }
}

// async function showData(reqData) {
//   showCharacters(reqData);
//   document.addEventListener("DOMNodeInserted", function (event) {
//     // Do something here
//     // console.log("new element added in DOM");
//     // console.log(event.target.getAttribute("class"))
//     if(event.target.getAttribute("class")=="card"){
//       addClickEvents();
//     }
//   });
//   // setTimeout(callback(),50000)
// }

// showData(null, addClickEvents);
