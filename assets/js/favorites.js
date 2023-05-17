// var passhash = CryptoJS.MD5("text to hash").toString();

// console.log(passhash);

var apikey = "711ae2113dc5b535e66dc2ecb1833930";
var private_key = "602efb43dfe796b9454e3e7776bcd160bbef90ac";

var marvelImages = $("#marvel-images");

showCharacters();

function showCharacters() {
  let url = "https://gateway.marvel.com/v1/public/characters/";
  let ts = Date.now();
  let hash = CryptoJS.MD5(ts + private_key + apikey).toString();
  let reqData = { ts: ts, apikey: apikey, hash: hash, orderBy: "modified" };

  let favoriteMarvels = JSON.parse(localStorage.getItem("favoriteMarvels"));
  if (favoriteMarvels) {
    favoriteMarvels.forEach((element) => {
      $.get(url + element, reqData, function (data) {
        if (data.data.results.length > 0) {
          let character = data.data.results[0];
          let id = character.id;
          let name = character.name;
          let src =
            character.thumbnail.path + "." + character.thumbnail.extension;
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
                        <div class="btn btn-favorite">Remove From Favorites</div>
                    </div>
                </div>
            </div>`;

          marvelImages.append(marvel);
        }
      });
    });
  } else {
    document.getElementById("no-list").innerText =
      "You have not added anything to your Favorites List yet!!!";
  }
}

function showAbout(ele) {
  // console.log(ele.getAttribute("data-id"))
  sessionStorage.setItem("aboutMarvelId", ele.getAttribute("data-id"));
  window.location.href = "about.html";
}

// For removing Marvels From Favorites
function manageFavorites(event, ele) {
  event.stopPropagation();
  // console.log(ele)
  let id = ele.getAttribute("data-id");
  let favoriteMarvels = JSON.parse(localStorage.getItem("favoriteMarvels"));
  if (favoriteMarvels) {
    // console.log(typeof(favoriteMarvels));
    if (favoriteMarvels.includes(id)) {
      let cardId = "#card" + id;
    //   console.log(favoriteMarvels);
      favoriteMarvels = favoriteMarvels.filter(item => item != id);
    //   console.log(favoriteMarvels);
      localStorage.setItem("favoriteMarvels", JSON.stringify(favoriteMarvels));
      alert("Marvel Removed From your Favorites");
      $(cardId).remove();
    }
  }
}
